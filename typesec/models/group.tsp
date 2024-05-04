import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

using TypeSpec.Rest;
using TypeSpec.Http;

model Group {
    id: string;
    contactPersonId: User.id;
    name: string;
    imageUrl: string;
    subGroups: SubGroup[];
    createdTime: utcDateTime;
    members: GroupMember[];
    membershipRequests: {
        ...GroupMember;
    };
}

model GroupDetailed {
    id: Group.id;
    contactPerson: User;
    name: string;
    welcomeMessage: string;
    activity: string;
    createdTime: utcDateTime;
    members: GroupMember[];
    subGroups: SubGroup.id[];
    experiments: Record<unknown>;
    shareContactInfo: boolean;
    adminsCanAddMembers: boolean;
    contactInfoHidden: boolean;
    memberPermissions: string[];
    guardianPermissions: string[];
    eventVisibility: string;
    chatAgeLimit: integer;
    type: integer;
    invitedToAppTime: utcDateTime;
    signUpUrl: string;
    countryCode: string;
    allowSmsNag: boolean;
    bonusEnabled: boolean;
    fieldDefs: Record<unknown>;
    defaultFields: Record<unknown>;
    roles: GroupRole[];
    addressFormat: string[];
    allowPrivatePayoutAccounts: boolean;
}

model GroupRole {
    id: string;
    name: string;
    permissions: string[];
}

model SubGroup {
    id: string;
    name: string;
    color: string;
}

model GroupMember {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    respondent: boolean;
    profile?: {
        ...User;
        contactMethod: string;
    };
    guardians: GroupMember[];

    // Who created the account
    creator?: boolean;

    address?: string[];
}

model FavoriteGroup {
    groupId: Group.id;
    subGroupId: SubGroup.id;
    timestamp: utcDateTime;
}

model CreateGroup {
    name: string;
    type: integer;
    activity: string;
    contactInfoHidden: boolean;
    primaryContact: string;
    chatAgeLimit: integer;
    subGroups: unknown[];
}
