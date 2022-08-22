import { JwtPayload } from 'jsonwebtoken';

type data = {
  email: string;
};

interface EmailJwtPayload extends JwtPayload {
  data: data;
}

export default EmailJwtPayload;
