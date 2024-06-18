// import { useState, FormEvent } from 'react';
// import { useContext } from 'react';
// import { UserContext } from '../../contexts/UserContext.tsx';
// import * as S from './style.ts'; 

// export const UserProfileForm = () => {
//   const { name, setName } = useContext(UserContext);
//   const [newName, setNewName] = useState(name);

//   const handleSubmit = (event: FormEvent) => {
//     event.preventDefault();
//     setName(newName);
//     alert('Nome atualizado com sucesso!');
//   };

//   return (
//     <S.ProfileContainer>
//       <S.ProfileForm onSubmit={handleSubmit}>
//         <S.ProfileTitle>Atualizar Nome</S.ProfileTitle>
//         <div>
//           <S.ProfileLabel htmlFor="name">Nome:</S.ProfileLabel>
//           <S.ProfileInput
//             type="text"
//             id="name"
//             value={newName}
//             onChange={(e) => setNewName(e.target.value)}
//           />
//         </div>
//         <S.ProfileButton type="submit">Salvar Nome</S.ProfileButton>
//       </S.ProfileForm>
//     </S.ProfileContainer>
//   );
// };