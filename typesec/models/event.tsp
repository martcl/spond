import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

using TypeSpec.Rest;
using TypeSpec.Http;

model EventOwner is User {
    response: string;
    appUser?: boolean;
}

model Event {
    id: string;
    creatorId: User.id;
    owners: EventOwner[];
    heading: string;
    description: string;
    startTimestamp: utcDateTime;
    endTimestamp: utcDateTime;
    recipients: {
        group: Group;
    };
    responses: EventResponses;
    tasks: Task[];
    comments: Comment[];
    attachments: Attachment[];
    createdTime: utcDateTime;
    expired: boolean;
    visibility: string;
    behalfOfIds: User.id[];
    autoAccept: boolean;
    hidden: boolean;
    autoReminderType: string;
    participantsHidden: boolean;
    registerd: boolean;
    commentsDisabled: boolean;
    type: string;
    updated: unixTimestamp32;
    matchEvent: boolean;
}

model EventResponses {
    acceptedIds: User.id[];
    declinedIds: User.id[];
    unansweredIds: User.id[];
    whaitinglistIds: User.id[];
    declineMessages: null; // TODO: Implement this type of map
}

model CreateEvent {
    heading: string;
    description: string;
    spondType: string;
    startTimestamp: utcDateTime;
    openEnded: boolean;
    commentsDisabled: boolean;
    meetupPrior: string;
    maxAccepted: integer;
    rsvpDate: utcDateTime;
    location: Location;
    owners: {
        id: EventOwner.id;
    }[];
    visibility: string;
    participantsHidden: boolean;
    autoReminderType: string;
    matchInfo: unknown;
    autoAccept: boolean;
    fileInput: string; // super sus deafult input . f.eks C:\\fakepath\\11118671.jpeg
    attachments: Attachment[];
    type: string;
    tasks: {
        openTasks: Task[];
        assignedTasks: unknown[];
    };
    recipients: {
        groupMembers: GroupMember.id[];
        group: {
            id: Group.id;
        };
    };
}
