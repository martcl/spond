import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

using TypeSpec.Rest;
using TypeSpec.Http;


model Attachment {
    id: string;
    media: url;
    type: integer;
    title: string;
    ownerId: User.id;
    timestamp: utcDateTime;
}

model Comment {
    id: string;
    fromProfileId: User.id;
    text: string;
    timestamp: utcDateTime;
    reactions: Record<Record<unixTimestamp32>>;
}

model Location {
    latitude: integer;
    longitude: integer;
    addressLine: integer;
    featureName: string;
    country: string;
    administrativeAreaLevel1: string;
    administrativeAreaLevel2: string;
    locality: string;
    feature: string;
    address: string;
}

model Task {
    id: string;
    name: string;
    description: string;
    type: string;
    adultsOnly: boolean;
    limit: integer;
}



