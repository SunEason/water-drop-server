import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('DateTime')
export class DateTimeScalar implements CustomScalar<string, Date> {
  description?: 'Date custom scalar type';

  parseValue(value: string): Date {
    return new Date(Number(value)); // value from the client
  }

  serialize(value: Date): string {
    return value.getTime().toString();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  }
}
