import { useState } from "react";
import useApi from "./useApi";

function useForm(timer: number) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fetchData: postUser } = useApi("POST", true);
  const [formMessage, setFormMessage] = useState<string | null>(null);


async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const json = { name, email, password, timer };
    try {
      const response = await postUser("/users", json);
      if (response) {
        console.log("User data submitted successfully:", response);
        setFormMessage("User data submitted successfully!");
      }
    } catch (err) {
      console.error("Error submitting user data:", err);
      setFormMessage("An error occurred while submitting user data.");
    }
  }

  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");
    setFormMessage(null);
  }

  return { name, email, password, setName, setEmail, setPassword, handleSubmit, formMessage, resetForm };
}

export default useForm;