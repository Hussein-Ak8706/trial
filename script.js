document.getElementById("uploadForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting the default way
    
    const formData = new FormData();
    const fileInput = document.getElementById("pdfFile");

    formData.append("file", fileInput.files[0]); // Add the selected file to the form data

    try {
        const response = await fetch("http://127.0.0.1:8000/upload-pdf/", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById("response").innerText = `File uploaded: ${data.filename}`;
        } else {
            const errorData = await response.json();
            document.getElementById("response").innerText = `Error: ${errorData.detail}`;
        }
    } catch (error) {
        console.error("Error uploading file:", error);
        document.getElementById("response").innerText = `Error: ${error.message}`;
    }
});
