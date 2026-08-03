"use server";

export async function signup(formData: FormData) {
  const first_name = formData.get('firstName')
  const last_name = formData.get('lastName')
  const email = formData.get('email')
  const password = formData.get('password')
  console.log(first_name);
}