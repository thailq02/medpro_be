import {config} from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import argv from 'minimist'

const options = argv(process.argv.slice(2))
export const isProduction = options.env === 'production'

dotenvExpand.expand(
  config({
    path: options.env ? `.env.${options.env}` : '.env'
  })
)

export const envConfig = {
  port: (process.env.PORT as string) || 10000,
  appUrl: process.env.APP_URL as string,
  clientUrl: process.env.CLIENT_URL as string,
  cmsUrl: process.env.CMS_URL as string,
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
  dbDoctorsCollection: process.env.DB_DOCTORS_COLLECTION as string,
  dbSchedulesCollection: process.env.DB_SCHEDULES_COLLECTION as string,
  dbAppointmentsCollection: process.env.DB_APPOINTMENTS_COLLECTION as string,
  dbConversationsCollection: process.env.DB_CONVERSATIONS_COLLECTION as string,

  secretOrPrivateKey: process.env.SECRET_OR_PRIVATE_KEY as string,

  jwtSecretAccessToken: process.env.JWT_ACCESS_TOKEN as string,
  jwtAccessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as string,

  jwtSecretRefreshToken: process.env.JWT_REFRESH_TOKEN as string,
  jwtRefreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string,

  jwtSecretForgotPasswordToken: process.env.JWT_FORGOT_PASSWORD_TOKEN as string,
  jwtForgotPasswordTokenExpiresIn: process.env.JWT_FORGOT_PASSWORD_TOKEN_EXPIRES_IN as string,

  jwtSecretEmailVerifyToken: process.env.JWT_EMAIL_VERIFY_TOKEN as string,
  jwtEmailVerifyTokenExpiresIn: process.env.JWT_EMAIL_VERIFY_TOKEN_EXPIRES_IN as string,

  firebaseApiKey: process.env.FIREBASE_API_KEY as string,
  firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID as string,
  firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
  firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID as string,
  firebaseAppId: process.env.FIREBASE_APP_ID as string,
  firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID as string,

  ggdriver_client_id: process.env.GG_DRIVER_CLIENT_ID as string,
  ggdriver_client_secret: process.env.GG_DRIVER_CLIENT_SECRET as string,
  ggdriver_redirec_uri: process.env.GG_DRIVER_REDIRECT_URI as string,
  ggdriver_refresh_token: process.env.GG_DRIVER_REFRESH_TOKEN as string,

  ggmail_client_id: process.env.GG_MAIL_CLIENT_ID as string,
  ggmail_client_secret: process.env.GG_MAIL_CLIENT_SECRET as string,
  ggmail_refresh_token: process.env.GG_MAIL_REFRESH_TOKEN as string,

  mail_mailer: process.env.MAIL_MAILER as string,
  mail_host: process.env.MAIL_HOST as string,
  mail_port: process.env.MAIL_PORT as string,
  mail_username: process.env.MAIL_USERNAME as string,
  mail_password: process.env.MAIL_PASSWORD as string,
  mail_encryption: process.env.MAIL_ENCRYPTION as string,
  mail_from_address: process.env.MAIL_FROM_ADDRESS as string,
  mail_from_name: process.env.MAIl_FROM_NAME as string,

  momo_access_key: process.env.MOMO_ACCESS_KEY as string,
  momo_secret_key: process.env.MOMO_SECRET_KEY as string,
  momo_partner_code: process.env.MONO_PARTNER_CODE as string,
  momo_request_type: process.env.MOMO_REQUEST_TYPE as string,

  googleClientId: process.env.GOOGLE_CLIENT_ID as string,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI as string,
  clientRedirectCallback: process.env.CLIENT_REDIRECT_CALLBACK as string
}
