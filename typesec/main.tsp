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

/**
 * This project is a just something I made to map the different endpoints of the Spond API, so
 * I can use them in other projects. Through this project, I found out that the API is kind
 * of messy and does not return the minimum amount of data needed for the client to work.
 * Be aware that this project is not affiliated with Spond in any way.
 */
@service({
    title: "Unofficial Spond API documentation",
})
@server("https://api.spond.com/core/v1/", "Spond API")
namespace Spond;

@tag("Profile")
@route("/login")
namespace NLogin {
    /**
     * Login to the spond account.
     */
    op post(email: string, password: string): LoginResponse;

    /**
     * Create a new spond account. Email can be a phone number.
     */
    @route("/create")
    @post
    op createAccount(...CreateAccount): CreateAccountResponse;

    /**
     * Verify the account with the code sent to the email.
     */
    @route("/verify")
    @post
    op verifyAccount(...VerifyAccount): LoginResponse;
}

@tag("Profile")
@route("/profile")
@useAuth(BearerAuth)
namespace NProfile {
    /**
     * Get the personal profile of the user.
     */
    op get(): PersonalProfile;
}

@tag("Profile")
@route("/hash")
@useAuth(BearerAuth)
namespace NHash {
    /**
     * Get the user hashes. (idk, what this is for)
     */
    op get(): UserHash;
}

@tag("Events")
@route("/sponds")
@useAuth(BearerAuth)
namespace NSponds {
    /**
     * Get a list of events.
     */
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

    /**
     * Create a new event.
     */
    @post op post(...CreateEvent): Event;

    /**
     * Accept the invitation to an event.
     */
    @route("/{eventId}/acceptHost")
    @post
    op acceptHost(eventId: string): {};

    /**
     * Decline the invitation to an event.
     */
    @route("/{eventId}/declineHost")
    @post
    op declineHost(eventId: string): {};
}

@tag("Groups")
@route("/groups")
@useAuth(BearerAuth)
namespace NGroups {
    /**
     * Get a list of groups.
     */
    op list(): GroupDetailed[];

    /**
     * Get a list of favorite groups.
     */
    @route("/favorites")
    @get
    op listFavorites(): FavoriteGroup[];
}
@tag("Groups")
@route("/group/")
@useAuth(BearerAuth)
namespace NGroup {
    /**
     * Create a new group.
     */
    op post(...CreateGroup): GroupDetailed;
}

@tag("Posts")
@route("/posts")
@useAuth(BearerAuth)
namespace NPosts {
    /**
     * Get a list of posts.
     */
    op list(
        @query type: string,
        @query includeComments: boolean,
        @query includeReadStatus: boolean,
        @query includeSeenCount: boolean,
        @query max: integer,
    ): Post[];
}

@route("/clock")
namespace NClock {
    /**
     * Random endpoint that returns the current time.
     */
    op get(): {
        time: utcDateTime;
    };
}
