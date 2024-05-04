import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

using TypeSpec.Rest;
using TypeSpec.Http;

model User {
    id: string;
    firstName: string;
    lastName: string;
    unableToReach: boolean;
    imageUrl: url;
    phoneNumber?: string;
    email?: string;
    dateOfBirth?: string;
}

model PersonalProfile is User {
    primaryEmail: string;
    dummy: boolean;
    trackingId: string;
    timezone: string;
    unsubscribeCode: string;
    locale: string;
    countryCode: string;
    internal: boolean;
    deleted: boolean;
    contactMethod: string;
    alternateEmails: string[];
    preferences: {
        globalPushPreferences: {
            acceptPushDisabled: boolean;
            declinePushDisabled: boolean;
            acceptTaskPushDisabled: boolean;
            declineTaskPushDisabled: boolean;
            commentNotifications: string;
            invitationPushDisabled: boolean;
            postPushDisabled: boolean;
            reminderPushDisabled: boolean;
            scheduledPrealertPushDisabled: boolean;
            scheduledSentPushDisabled: boolean;
            bonusContributePushDisabled: boolean;
            bonusAchievementPushDisabled: boolean;
            matchNotificationsPushDisabled: boolean;
            availablePushDisabled: boolean;
            unavailablePushDisabled: boolean;
            availabilityReminderPushDisabled: boolean;
        };
        groupPushPreferences: Record<unknown>;
        targetedAdsDisabled: boolean;
        cashbackPromoDisabled: boolean;
        partnerPromoDisabled: boolean;
        optionalSettings: Record<unknown>;
    };
    gender: string;
    tosVersion: integer;
    formattedPhoneNumber: string;
    contact: boolean;
}

model UserHash {
    webUserHash: string;
    androidUserHash: string;
    iosUserHash: string;
    value: string;
}
