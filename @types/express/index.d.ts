import { RoleType } from "../../src/common";
declare global {
    namespace Express {
      interface Request {
        user?: {
          id: string;
          role: RoleType; // Use your RoleEnum type
        };
      }
    }
  }