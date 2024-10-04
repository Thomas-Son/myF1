// import { 
//   Form,
//   Input,
//   Button,
//   YStack,
//   H2,
//   Label,
//   Separator
// } from "@my/ui";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import { mutate } from "swr";

// interface FormData {
//   alias: string;
//   email: string;
//   pwd: string;
// }

// interface Error {
//   alias?: string;
//   email?: string;
//   pwd?: string;
// }

// type Props = {
//   formId: string;
//   userForm: FormData;
//   forNewUser?: boolean;
// };

// export default function FormUser({ formId, userForm, forNewUser = true }: Props) {
//   const router = useRouter();
//   const contentType = "application/json";
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");

//   const [alias, setAlias] = useState(userForm.alias);
//   const [email, setEmail] = useState(userForm.email);
//   const [pwd, setPwd] = useState(userForm.pwd);

//   /* The PUT method edits an existing entry in the mongodb database. */
//   const putData = async ({ alias, email, pwd }: FormData) => {
//     const { id } = router.query;

//     try {
//       const res = await fetch(`/api/users/${id}`, {
//         method: "PUT",
//         headers: {
//           Accept: contentType,
//           "Content-Type": contentType,
//         },
//         body: JSON.stringify({ alias, email, pwd }),
//       });

//       // Throw error with status code in case Fetch API req failed
//       if (!res.ok) {
//         throw new Error(res.status.toString());
//       }

//       const { data } = await res.json();

//       mutate(`/api/users/${id}`, data, false); // Update the local data without a revalidation
//       router.push("/admin/users");
//     } catch (error) {
//       setMessage("Failed to update user");
//     }
//   };

//   /* The POST method adds a new entry in the mongodb database. */
//   const postData = async ({ alias, email, pwd }: FormData) => {
//     try {
//       const res = await fetch("/api/users", {
//         method: "POST",
//         headers: {
//           Accept: contentType,
//           "Content-Type": contentType,
//         },
//         body: JSON.stringify({ alias, email, pwd }),
//       });

//       // Throw error with status code in case Fetch API req failed
//       if (!res.ok) {
//         throw new Error(res.status.toString());
//       }

//       router.push("/admin/users");
//     } catch (error) {
//       setMessage("Failed to add pet");
//     }
//   };

//   /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
//   const formValidate = () => {
//     let err: Error = {};
//     if (!alias) err.alias = "Name is required";
//     if (!email) err.email = "Owner is required";
//     if (!pwd) err.pwd = "Species is required";
//     return err;
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const errs = formValidate();

//     if (Object.keys(errs).length === 0) {
//       forNewUser ? postData({ alias, email, pwd }) : putData({ alias, email, pwd });
//     } else {
//       setErrors({ errs });
//     }
//   };

//   return (
//     <>
//       <YStack f={1} gap="$4" margin="auto" marginTop="$8" width="90%" bg="$black12">
//         <H2>{formId}</H2>
//         <Separator/>

//         <YStack alignItems="center">
//           <form onSubmit={handleSubmit}>
//             <Label>Pseudo</Label>
//             <Input
//               size="$4"
//               placeholder="Pseudo"
//               type="text"
//               value={alias}
//               onChange={(e) => setAlias(e.target.value)}
//               required
//             />

//             <Label>Email</Label>
//             <Input
//               size="$4"
//               placeholder="Email"
//               type="text"
//               value={team}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             <Label>Mot de passe</Label>
//             <Input
//               size="$4"
//               placeholder="Mot de passe"
//               type="text"
//               value={pwd}
//               onChange={(e) => setPwd(e.target.value)}
//               required
//             />

//             <Button type="submit" className="btn" width="$12" margin="auto" marginTop="$4">
//               Ajouter
//             </Button>
//           </form>
//         </YStack>

//       </YStack>

//       <p>{message}</p>
//       <div>
//         {Object.keys(errors).map((err, index) => (
//           <li key={index}>{err}</li>
//         ))}
//       </div>
//     </>
//   );
// };