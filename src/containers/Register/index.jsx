import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

// biome-ignore assist/source/organizeImports: <explanation>
import {
  Container,
  Form,
  InputContainer,
  LeftContainer,
  RightContainer,
  Title,
} from './styles';
import Logo from '../../assets/logo.svg';
import { Button } from '../../components/button';

export function Register() {
  const schema = yup
    .object({
      name: yup.string().required('O nome é obrigatório'),
      email: yup
        .string()
        .email('Digite um e-mail válido')
        .required('o e-mail é obrigatório'),
      password: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .required('Digite uma senha'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'As senhas devem ser iguais').required('Confirme sua senha')
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);
  const onSubmit = async (data) => {
    const response = await toast.promise(api.post('/users', {
      name: data.name,
      email: data.email,
      password: data.password
    }),
  {
      pending: 'Verificando seus dados',
      success: 'Cadastro efetuado com sucesso 👌',
      error: 'Ops, aldo deu errado! tente novamente🤯'
  })
    console.log(response)
  }

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburguer" />
      </LeftContainer>
      <RightContainer>
        <Title>
         Criar Conta!
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label htmlFor="name-input"> Nome </label>
            <input type="text" id="name-input" {...register('name')}></input>
            <p>{errors?.name?.message}</p>
          </InputContainer>
          <InputContainer>
            <label htmlFor="email-input"> Email </label>
            <input type="email" id="email-input" {...register('email')}></input>
            <p>{errors?.email?.message}</p>
          </InputContainer>
          <InputContainer>
            <label htmlFor="password-input"> Senha </label>
            <input
              type="password"
              id="password-input"
              {...register('password')}
            ></input>
            <p>{errors?.password?.message}</p>
          </InputContainer>
           <InputContainer>
            <label htmlFor="confirm-password-input"> Confirmar Senha </label>
            <input
              type="password"
              id="confirm-password-input"
              {...register('confirmPassword')}
            ></input>
            <p>{errors?.confirmPassword?.message}</p>
          </InputContainer>
          <Button type="submit"> Criar Conta </Button>
        </Form>
        <p>
          Já possui conta? <a> Clique aqui. </a>
        </p>
      </RightContainer>
    </Container>
  );
}
