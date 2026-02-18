import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

export function Login() {
  const schema = yup
    .object({
      email: yup
        .string()
        .email('Digite um e-mail válido')
        .required('o e-mail é obrigatório'),
      password: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .required('Digite uma senha'),
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
  const onSubmit = (data) => console.log(data);

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburguer" />
      </LeftContainer>
      <RightContainer>
        <Title>
          Olá, seja bem vindo ao{' '}
          <span>
            Dev Burguer! <br />
          </span>
          Acesse com seu <span>Login e senha.</span>
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="submit"> Entrar </Button>
        </Form>
        <p>
          Não possui conta? <a> Clique aqui. </a>
        </p>
      </RightContainer>
    </Container>
  );
}
