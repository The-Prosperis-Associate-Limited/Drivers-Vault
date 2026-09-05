"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { StarRating } from "@/components/shared/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetData } from "@/hooks/use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { driverTypeLabel, formatRelativeTime, getInitials } from "@/lib/utils";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Clock,
  MessageSquareOff,
  Plus,
  ScrollText,
  UserRound,
} from "lucide-react";
import type {
  DriverReview,
  DriverSearchResult,
  PublicDriverProfile,
} from "@/types/driver";
import type { APIResponse, PaginatedResponse } from "@/types/response";
import { TrustRing } from "./trust-ring";

interface Props {
  driverUserId: string | null;
  onOpenChange: (open: boolean) => void;
}

export const DriverProfileDialog = function ({
  driverUserId,
  onOpenChange,
}: Props) {
  const { data, isFetching } = useGetData<APIResponse<PublicDriverProfile>>({
    url: driverUserId ? API_ENDPOINTS.drivers.detail(driverUserId) : "",
    shouldFetch: !!driverUserId,
  });

  const { data: reviewsData } = useGetData<PaginatedResponse<DriverReview>>({
    url: driverUserId ? API_ENDPOINTS.drivers.reviews(driverUserId) : "",
    shouldFetch: !!driverUserId,
  });

  const profile = data?.data;
  const reviews = reviewsData?.data ?? [];

  // Same type, same state — the two most alike drivers the marketplace has.
  const { data: similarData } = useGetData<
    PaginatedResponse<DriverSearchResult>
  >({
    url: profile
      ? API_ENDPOINTS.drivers.search(
          new URLSearchParams({
            ...(profile.driver_type && { driver_type: profile.driver_type }),
            ...(profile.user.state_of_residence && {
              state: profile.user.state_of_residence,
            }),
            limit: "3",
          }).toString(),
        )
      : "",
    shouldFetch: !!profile,
  });

  const similar = (similarData?.data ?? [])
    .filter((driver) => driver.userId !== driverUserId)
    .slice(0, 2);

  const name = profile
    ? [profile.user.first_name, profile.user.last_name]
        .filter(Boolean)
        .join(" ") || "Driver"
    : "";

  const quickStats = profile && [
    {
      icon: BriefcaseBusiness,
      label: "Completed Jobs",
      value: String(profile.completed_jobs),
    },
    {
      icon: Clock,
      label: "On-Time Rate",
      value: profile.on_time_rate === null ? "—" : `${profile.on_time_rate}%`,
    },
    {
      icon: Clock,
      label: "Response Time",
      value:
        profile.response_time_minutes === null
          ? "—"
          : profile.response_time_minutes < 60
            ? `${profile.response_time_minutes} mins`
            : `${Math.round(profile.response_time_minutes / 60)} hrs`,
    },
  ];

  return (
    <AppDialog
      isOpen={!!driverUserId}
      onOpenChange={onOpenChange}
      title={name || "Driver profile"}
      width="1100px"
    >
      {isFetching && !profile ? (
        <div className="space-y-4">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>
      ) : !profile ? (
        <EmptyState
          icon={UserRound}
          title="Driver not found"
          description="This profile is no longer available."
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={profile.user.profile_pic ?? undefined}
                    alt=""
                  />
                  <AvatarFallback>
                    {getInitials(
                      profile.user.first_name,
                      profile.user.last_name,
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <span className="flex items-center gap-1.5">
                    <AppText type="h3" className="text-lg font-bold">
                      {name}
                    </AppText>
                    <BadgeCheck className="fill-brand h-4 w-4 text-white" />
                  </span>
                  <AppText
                    type="caption"
                    className="text-muted-foreground block"
                  >
                    {driverTypeLabel(profile.driver_type)}
                  </AppText>
                </div>
              </div>

              <TrustRing score={profile.trust_score} />
            </div>

            <span className="mt-3 flex items-center gap-2">
              <StarRating rating={profile.rating} />
              <AppText type="caption" className="text-muted-foreground">
                {profile.rating.toFixed(1)} ({profile.review_count} Reviews)
              </AppText>
            </span>

            {profile.user.bio && (
              <div className="mt-6">
                <AppText type="h3" className="text-base font-semibold">
                  About
                </AppText>
                <AppText
                  type="subtitle"
                  className="text-muted-foreground mt-2 block text-sm leading-relaxed"
                >
                  {profile.user.bio}
                </AppText>
              </div>
            )}

            {profile.certifications.length > 0 && (
              <div className="mt-6">
                <AppText type="h3" className="text-base font-semibold">
                  Training and Certificate
                </AppText>
                <div className="bg-muted/40 mt-3 flex flex-wrap gap-3 rounded-xl p-3">
                  {profile.certifications.map((certification) => (
                    <span
                      key={certification.id}
                      className="border-border flex items-center gap-2 rounded-lg border bg-white px-4 py-3"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
                        <ScrollText className="h-4 w-4 text-amber-500" />
                      </span>
                      <AppText type="label" className="text-brand text-sm">
                        {certification.title}
                      </AppText>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <AppText type="h3" className="text-base font-semibold">
                Reviews
              </AppText>

              {reviews.length === 0 ? (
                <EmptyState
                  icon={MessageSquareOff}
                  title="No reviews yet"
                  description="This driver hasn't been reviewed by a client so far."
                  className="mt-3"
                />
              ) : (
                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {reviews.slice(0, 4).map((review) => (
                    <div key={review.id} className="bg-muted/40 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={review.author.profile_pic ?? undefined}
                            alt=""
                          />
                          <AvatarFallback>
                            {getInitials(
                              review.author.first_name,
                              review.author.last_name,
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <AppText type="label" className="text-sm">
                          {[review.author.first_name, review.author.last_name]
                            .filter(Boolean)
                            .join(" ") || "Client"}
                        </AppText>
                      </div>
                      <span className="mt-2 flex items-center gap-2">
                        <StarRating rating={review.rating} />
                        <AppText
                          type="caption"
                          className="text-muted-foreground"
                        >
                          {formatRelativeTime(review.createdAt)}
                        </AppText>
                      </span>
                      {review.comment && (
                        <AppText
                          type="caption"
                          className="text-muted-foreground mt-2 block leading-relaxed"
                        >
                          "{review.comment}"
                        </AppText>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-border rounded-2xl border bg-white p-5 shadow-sm">
              <AppText type="h3" className="text-base font-semibold">
                Quick stats
              </AppText>
              <div className="mt-4 space-y-4">
                {quickStats?.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <span
                      key={stat.label}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="flex items-center gap-3">
                        <span className="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
                          <Icon className="text-muted-foreground h-4 w-4" />
                        </span>
                        <AppText
                          type="caption"
                          className="text-muted-foreground"
                        >
                          {stat.label}
                        </AppText>
                      </span>
                      <AppText type="label" className="text-sm">
                        {stat.value}
                      </AppText>
                    </span>
                  );
                })}
              </div>

              {/* The request flow has no designs yet — this button gets its
                  action when they arrive. */}
              <Button className="mt-5 h-12 w-full rounded-lg text-sm">
                <Plus className="h-4 w-4" />
                Request
              </Button>
            </div>

            {profile.availability && profile.availability.length > 0 && (
              <div className="border-border rounded-2xl border bg-white p-5 shadow-sm">
                <AppText type="h3" className="text-base font-semibold">
                  Availability
                </AppText>
                <div className="mt-4 space-y-4">
                  {profile.availability.map((slot) => (
                    <span
                      key={slot.day_range}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="flex items-center gap-3">
                        <span className="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
                          <Clock className="text-muted-foreground h-4 w-4" />
                        </span>
                        <AppText
                          type="caption"
                          className="text-muted-foreground"
                        >
                          {slot.day_range}
                        </AppText>
                      </span>
                      <AppText type="label" className="text-sm">
                        {slot.start} - {slot.end}
                      </AppText>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {similar.length > 0 && (
              <div>
                <AppText type="h3" className="text-base font-semibold">
                  Similar Driver
                </AppText>
                <div className="mt-3 space-y-3">
                  {similar.map((driver) => (
                    <div
                      key={driver.id}
                      className="border-border flex items-center justify-between gap-3 rounded-2xl border bg-white p-4 shadow-sm"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="relative shrink-0">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={driver.user.profile_pic ?? undefined}
                              alt=""
                            />
                            <AvatarFallback>
                              {getInitials(
                                driver.user.first_name,
                                driver.user.last_name,
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <BadgeCheck className="fill-brand absolute -right-0.5 -bottom-0.5 h-4 w-4 text-white" />
                        </div>
                        <div className="min-w-0">
                          <AppText type="label" className="block truncate">
                            {[driver.user.first_name, driver.user.last_name]
                              .filter(Boolean)
                              .join(" ") || "Driver"}
                          </AppText>
                          <AppText
                            type="caption"
                            className="text-muted-foreground block truncate"
                          >
                            {driverTypeLabel(driver.driver_type)}
                          </AppText>
                        </div>
                      </div>
                      <TrustRing score={driver.trust_score} size={48} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AppDialog>
  );
};
