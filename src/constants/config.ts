import {config} from 'dotenv'

config()

export const envConfig = {
  port: (process.env.PORT as string) || 4000,
  passwordSecret: process.env.PASSWORD_SECRET as string,

  dbName: process.env.DB_NAME as string,
  dbUsername: process.env.DB_USERNAME as string,
  dbPassword: process.env.DB_PASSWORD as string,

  dbUsersCollection: process.env.DB_USERS_COLLECTION as string,
  dbRefreshTokensCollection: process.env.DB_REFRESH_TOKENS_COLLECTION as string,
  dbCategoriesCollection: process.env.DB_CATEGORIES_COLLECTION as string,
  dbMedicalBookingFormsCollection: process.env.DB_MEDICAL_BOOKING_FORMS_COLLECTION as string,
  dbHospitalsCollection: process.env.DB_HOSPITALS_COLLECTION as string,
  dbServicesCollection: process.env.DB_SERVICES_COLLECTION as string,
  dbSpecialtiesCollection: process.env.DB_SPECIALTIES_COLLECTION as string,

  secretOrPrivateKey: process.env.SECRET_OR_PRIVATE_KEY as string,

  jwtSecretAccessToken: process.env.JWT_ACCESS_TOKEN as string,
  jwtAccessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as string,

  jwtSecretRefreshToken: process.env.JWT_REFRESH_TOKEN as string,
  jwtRefreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string,

  jwtSecretForgotPasswordToken: process.env.JWT_FORGOT_PASSWORD_TOKEN as string,
  jwtForgotPasswordTokenExpiresIn: process.env.JWT_FORGOT_PASSWORD_TOKEN_EXPIRES_IN as string,

  jwtSecretEmailVerifyToken: process.env.JWT_EMAIL_VERIFY_TOKEN as string,
  jwtEmailVerifyTokenExpiresIn: process.env.JWT_EMAIL_VERIFY_TOKEN_EXPIRES_IN as string
}
