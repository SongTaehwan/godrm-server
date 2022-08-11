import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
	(data: string, context: ExecutionContext) => {
		const hostType = context.getType();

		if (hostType === 'http') {
			const request = context.switchToHttp().getRequest();
			const user = request.user;

			return user[data] ?? user;
		}
	},
);
