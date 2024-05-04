import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

using TypeSpec.Rest;
using TypeSpec.Http;

model Post {
    id: string;
    type: string;
    groupId: Group.id;
    subGroupIds: SubGroup.id[];
    title: string;
    body: string;
    ownerId: User.id;
    timestamp: utcDateTime;
    media: PostMedia[];
    reactions: Record<Record<unixTimestamp32>>;
    attachments: Attachment[];
    visibility: string;
    unread: boolean;
    commentsDisabled: boolean;
    seenCount: integer;
    muted: boolean;
    selectMemberPoll: boolean;
    comments: Comment[];
}

model PostMedia {
    url: url;
    width?: integer;
    height?: integer;
    type: string;
}

