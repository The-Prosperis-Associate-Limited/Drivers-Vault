"use client";

import { AppText } from "@/components/shared/app-text";
import { BackLink } from "@/components/shared/back-link";
import { EmptyState } from "@/components/shared/empty-state";
import { StarRating } from "@/components/shared/star-rating";
import { TrustRing } from "@/components/drivers/trust-ring";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetData } from "@/hooks/use-get-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import {
  driverTypeLabel,
  formatMoney,
  formatRelativeTime,
  getInitials,
} from "@/lib/utils";
import {
  BadgeCheck,
  CircleCheck,
  GraduationCap,
  Plus,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { use } from "react";
import type { DriverReview, PublicDriverProfile } from "@/types/driver";
import type { APIResponse, PaginatedResponse } from "@/types/response";

// The checks an APPROVED driver has actually passed — identity (NIN slip),
// licence and guarantor documents are what verification reviews. A police
// record check does not exist yet, so it is not listed.
const VERIFIED_CHECKS = ["NIMC identity", "FRSC licence", "Guarantor"];

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border rounded-2xl border bg-white p-5 md:p-6">
      <span className="flex items-center gap-2">
        {icon}
        <AppText type="h3" className="text-base font-semibold">
          {title}
        </AppText>
      </span>
      {children}
    </div>
  );
}

export default function DriverProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data, isFetching } = useGetData<APIResponse<PublicDriverProfile>>({
    url: API_ENDPOINTS.drivers.detail(id),
  });

  const { data: reviewsData } = useGetData<PaginatedResponse<DriverReview>>({
    url: API_ENDPOINTS.drivers.reviews(id),
  });

  const profile = data?.data;
  const reviews = reviewsData?.data ?? [];

  if (!profile) {
    return (
      <div className="mx-auto max-w-6xl space-y-4">
        <BackLink href="/dashboard/requests/find-talent" />
        {isFetching ? (
          <>
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
          </>
        ) : (
          <EmptyState
            icon={UserRound}
            title="Driver not found"
            description="This profile is no longer available."
          />
        )}
      </div>
    );
  }

  const name =
    [profile.user.first_name, profile.user.last_name]
      .filter(Boolean)
      .join(" ") || "Driver";

  const location = [profile.user.city, profile.user.state_of_residence]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto max-w-6xl">
      <BackLink
        href="/dashboard/requests/find-talent"
        label="Take a step back"
      />

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={profile.user.profile_pic ?? undefined} alt="" />
            <AvatarFallback>
              {getInitials(profile.user.first_name, profile.user.last_name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <span className="flex items-center gap-2">
              <AppText type="h2" className="text-lg font-bold">
                {name}
              </AppText>
              {/* Only discoverable drivers reach this page, so the chip is true. */}
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                Available now
              </span>
            </span>
            <AppText type="caption" className="text-muted-foreground block">
              {driverTypeLabel(profile.driver_type)}
            </AppText>
            <span className="mt-0.5 flex flex-wrap items-center gap-x-3">
              {location && (
                <AppText type="caption" className="text-muted-foreground">
                  {location}
                </AppText>
              )}
              {profile.years_of_experience != null && (
                <AppText type="caption" className="text-muted-foreground">
                  {profile.years_of_experience} years experience
                </AppText>
              )}
              {profile.review_count > 0 && (
                <AppText type="caption" className="text-muted-foreground">
                  {profile.rating.toFixed(1)} ({profile.review_count} reviews)
                </AppText>
              )}
            </span>
          </div>
        </div>

        {/* The request flow has no designs yet — wired when they arrive. */}
        <Button className="h-12 rounded-xl px-6 text-sm">
          <Plus className="h-4 w-4" />
          Hire Driver
        </Button>
      </div>

      <div className="border-border mt-5 border-t" />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card title="About">
            {profile.user.bio ? (
              <AppText
                type="subtitle"
                className="text-muted-foreground mt-3 block text-sm leading-relaxed"
              >
                {profile.user.bio}
              </AppText>
            ) : (
              <AppText
                type="caption"
                className="text-muted-foreground mt-3 block"
              >
                This driver hasn't written a bio yet.
              </AppText>
            )}

            {profile.certifications.length > 0 && (
              <div className="mt-4">
                <AppText
                  type="caption"
                  className="text-muted-foreground block text-[10px] font-semibold tracking-[0.2em] uppercase"
                >
                  Certifications
                </AppText>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.certifications.map((certification) => (
                    <span
                      key={certification.id}
                      className="bg-muted text-ink rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {certification.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>

          <Card title="Work history">
            {profile.work_experiences.length === 0 ? (
              <AppText
                type="caption"
                className="text-muted-foreground mt-3 block"
              >
                No work history shared yet.
              </AppText>
            ) : (
              <div className="mt-3 space-y-4">
                {profile.work_experiences.map((experience) => (
                  <span
                    key={experience.id}
                    className="flex items-start justify-between gap-3"
                  >
                    <span>
                      <AppText type="label" className="block text-sm">
                        {experience.job_title}
                      </AppText>
                      <AppText
                        type="caption"
                        className="text-muted-foreground block"
                      >
                        {experience.employer}
                      </AppText>
                    </span>
                    <AppText type="caption" className="text-muted-foreground">
                      {new Date(experience.started_at).getFullYear()} –{" "}
                      {experience.is_current || !experience.ended_at
                        ? "date"
                        : new Date(experience.ended_at).getFullYear()}
                    </AppText>
                  </span>
                ))}
              </div>
            )}
          </Card>

          <Card title="Client reviews">
            {reviews.length === 0 ? (
              <AppText
                type="caption"
                className="text-muted-foreground mt-3 block"
              >
                No reviews yet.
              </AppText>
            ) : (
              <div className="mt-3 divide-y">
                {reviews.slice(0, 4).map((review) => (
                  <div key={review.id} className="py-4 first:pt-0 last:pb-0">
                    <span className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
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
                    </span>
                    <span className="mt-2 flex items-center gap-2">
                      <StarRating rating={review.rating} />
                      <AppText type="caption" className="text-muted-foreground">
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
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Trust score">
            <div className="mt-4 flex flex-col items-center">
              <TrustRing score={profile.trust_score} size={80} />
              <AppText
                type="caption"
                className="text-muted-foreground mt-3 block text-center"
              >
                Based on verified documents, training, reviews and reliability.
              </AppText>
            </div>
          </Card>

          <Card
            title="Verified checks"
            icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}
          >
            <div className="mt-4 space-y-3">
              {VERIFIED_CHECKS.map((check) => (
                <span key={check} className="flex items-center gap-2">
                  <CircleCheck className="h-4 w-4 text-emerald-600" />
                  <AppText type="caption" className="text-ink">
                    {check}
                  </AppText>
                </span>
              ))}
            </div>
          </Card>

          <Card
            title="Training"
            icon={<GraduationCap className="text-brand h-5 w-5" />}
          >
            <AppText type="h2" className="mt-3 block text-2xl font-bold">
              {profile.certifications.length}
            </AppText>
            <AppText type="caption" className="text-muted-foreground block">
              course{profile.certifications.length === 1 ? "" : "s"} certified
            </AppText>
          </Card>

          <Card title="Rate">
            <AppText type="h2" className="mt-3 block text-2xl font-bold">
              {profile.expected_monthly_rate
                ? `${formatMoney(profile.expected_monthly_rate, profile.rate_currency)} / month`
                : "Not set"}
            </AppText>
            <AppText type="caption" className="text-muted-foreground block">
              {driverTypeLabel(profile.driver_type)}
            </AppText>
          </Card>
        </div>
      </div>
    </div>
  );
}
