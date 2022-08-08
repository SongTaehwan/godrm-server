export const TIMESTAMP = {
  updatedAt: 'updated_at',
  createdAt: 'created_at',
};

export const DEFAULT_SCHEMA_OPTIONS = {
  autoIndex: true,
  autoCreate: true,
  timestamps: TIMESTAMP,
  toJSON: {
    virtuals: true,
    transform: (doc, ret, options) => {
      delete ret.__v;
      delete ret._id;
    },
  },
};
