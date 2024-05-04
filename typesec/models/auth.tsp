import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

using TypeSpec.Rest;
using TypeSpec.Http;

model CreateAccount {
    email: string;
    firstName: string;
    lastName: string;

    @secret
    password: string;

    locale: string;
    intMarketing: boolean;
    extMarketing: boolean;
    dateOfBirth: string;
    gender: string;
}

model CreateAccountResponse {
    method: string;
    primaryEmail: string;
}

model VerifyAccount {
    email: string;
    verificationCode: string;
}

model LoginResponse {
    loginToken: string;

    @secret
    passwordToken: string;
}
