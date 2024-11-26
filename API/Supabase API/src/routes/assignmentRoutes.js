const express = require("express");
const authenticateUser = require("../middlewares/authenticateUser");
const supabase = require("../config/supabaseClient");
const { v4: uuidv4 } = require("uuid"); // For generating unique document IDs

const router = express.Router();

// Endpoint to fetch details of a specific assignment
router.get("/:assignment_id", authenticateUser, async (req, res) => {
  const { assignment_id } = req.params;

  try {
    // Fetch assignment details
    const { data: assignment, error: assignmentError } = await supabase
      .from("Assignments")
      .select("*")
      .eq("assignment_id", assignment_id)
      .single();

    if (assignmentError || !assignment) {
      console.error("Error fetching assignment:", assignmentError?.message);
      return res.status(404).json({ error: "Assignment not found" });
    }

    // Fetch related documents
    const { data: documents, error: documentsError } = await supabase
      .from("Assignments_Documents")
      .select(
        `
        document_id,
        Documents (
          file_url,
          file_type,
          uploaded_by,
          associated_with
        )
      `
      )
      .eq("assignment_id", assignment_id);

    if (documentsError) {
      console.error(
        "Error fetching related documents:",
        documentsError.message
      );
      return res
        .status(500)
        .json({ error: "Error fetching related documents" });
    }

    // Combine assignment and documents into a single response
    const response = {
      ...assignment,
      documents: documents.map((doc) => ({
        document_id: doc.document_id,
        file_url: doc.Documents.file_url,
        file_type: doc.Documents.file_type,
        uploaded_by: doc.Documents.uploaded_by,
        associated_with: doc.Documents.associated_with,
      })),
    };

    res.status(200).json(response); // Return the combined response
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to create a new assignment
router.post("/", authenticateUser, async (req, res) => {
  const { title, description, assigned_at, due_for, class_id, documents } =
    req.body; // `documents` should be an array of file objects (e.g., { name, type, data })
  const userId = req.auth.user.id; // Get the session user ID

  try {
    // Validate input
    if (!title || !description || !assigned_at || !due_for || !class_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a new assignment
    const { data: newAssignment, error: assignmentError } = await supabase
      .from("Assignments")
      .insert([
        {
          title,
          description,
          assigned_at,
          due_for,
          class_id,
          created_at: new Date().toISOString(), // Automatically set created_at
        },
      ])
      .select()
      .single();

    if (assignmentError) {
      console.error("Error creating assignment:", assignmentError.message);
      return res.status(500).json({ error: "Failed to create assignment" });
    }

    const assignmentId = newAssignment.assignment_id;

    // Upload and link documents if provided
    if (documents && documents.length > 0) {
      for (const document of documents) {
        const documentId = uuidv4(); // Generate a unique document ID
        const filePath = `${documentId}-${document.name}`; // Create a unique file path

        // Upload the file to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from("assignments-documents")
          .upload(filePath, Buffer.from(document.data, "base64"), {
            contentType: document.type,
          });

        if (uploadError) {
          console.error("Error uploading document:", uploadError.message);
          return res.status(500).json({ error: "Failed to upload document" });
        }

        const fileUrl = supabase.storage
          .from("assignments-documents")
          .getPublicUrl(filePath).data.publicUrl;

        // Insert document metadata into `Documents` table
        const { error: documentError } = await supabase
          .from("Documents")
          .insert([
            {
              document_id: documentId,
              file_url: fileUrl,
              file_type: document.type,
              uploaded_by: userId,
              associated_with: "Assignment",
            },
          ]);

        if (documentError) {
          console.error(
            "Error saving document metadata:",
            documentError.message
          );
          return res
            .status(500)
            .json({ error: "Failed to save document metadata" });
        }

        // Link the document to the assignment
        const { error: linkError } = await supabase
          .from("Assignments_Documents")
          .insert([
            {
              assignment_id: assignmentId,
              document_id: documentId,
            },
          ]);

        if (linkError) {
          console.error(
            "Error linking document to assignment:",
            linkError.message
          );
          return res
            .status(500)
            .json({ error: "Failed to link document to assignment" });
        }
      }
    }

    // Return the newly created assignment
    res.status(201).json(newAssignment);
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to delete an assignment
router.delete("/:assignment_id", authenticateUser, async (req, res) => {
  const { assignment_id } = req.params;

  try {
    const { error } = await supabase
      .from("Assignments")
      .delete()
      .eq("assignment_id", assignment_id);

    if (error) {
      console.error("Error deleting assignment:", error.message);
      return res.status(500).json({ error: "Failed to delete assignment" });
    }

    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
