import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

import "./models/misc.tsp";
import "./models/event.tsp";
import "./models/group.tsp";
import "./models/user.tsp";
import "./models/post.tsp";
import "./models/auth.tsp";

using TypeSpec.Rest;
using TypeSpec.Http;

@service({
    title: "Unofficial documentation for the Spond API (work in progress)",
})
@server("https://api.spond.com/core/v1/", "Spond API")
namespace Spond;

@route("/login")
namespace NLogin {
    op post(email: string, password: string): LoginResponse & ResponseHeaders;

    @route("/create")
    @post
    op createAccount(...CreateAccount): CreateAccountResponse & ResponseHeaders;

    @route("/verify")
    @post
    op verifyAccount(...VerifyAccount): LoginResponse & ResponseHeaders;
}

@route("/profile")
@useAuth(BearerAuth)
namespace NProfile {
    op get(): PersonalProfile & ResponseHeaders;
}

@route("/sponds")
@useAuth(BearerAuth)
namespace NSponds {
    @get op list(
        @query includeComments: boolean,
        @query includeHidden: boolean,
        @query addProfileInfo: boolean,
        @query scheduled: boolean,
        @query order: "asc" | "desc",
        @query max: integer,
        @query groupId: string,
        @query minEndTimestamp: utcDateTime,
        @query maxEndTimestamp: utcDateTime,
    ): Event[];

    @post op post(...CreateEvent): Event;

    @route("/{eventId}/acceptHost")
    @post
    op acceptHost(eventId: string): {};

    @route("/{eventId}/declineHost")
    @post
    op declineHost(eventId: string): {};
}

@route("/clock")
namespace NClock {
    op get(): {
        time: utcDateTime;
    } & ResponseHeaders;
}

@route("/hash")
@useAuth(BearerAuth)
namespace NHash {
    op get(): UserHash & ResponseHeaders;
}

@route("/groups/favorites")
@useAuth(BearerAuth)
namespace NFavorites {
    op list(): FavoriteGroup[];
}

@route("/groups")
@useAuth(BearerAuth)
namespace NGroups {
    op list(): GroupDetailed[];
}

@route("/group/")
@useAuth(BearerAuth)
namespace NGroup {
    op post(...CreateGroup): GroupDetailed;
}

@route("/posts")
@useAuth(BearerAuth)
namespace NPosts {
    op list(
        @query type: string,
        @query includeComments: boolean,
        @query includeReadStatus: boolean,
        @query includeSeenCount: boolean,
        @query max: integer,
    ): Post[];
}
