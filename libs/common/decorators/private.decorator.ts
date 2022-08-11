import { SetMetadata } from '@nestjs/common';

const IS_PUBLIC_KEY = 'isPublic';

export const Private = () => SetMetadata(IS_PUBLIC_KEY, false);
