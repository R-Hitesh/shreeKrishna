export function showSuccessAlert(message = "Item added successfully.") {
  Swal.fire({
    title: "Success!",
    text: message,
    icon: "success"
  });
}
