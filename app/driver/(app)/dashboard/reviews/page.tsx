"use client";

import { AppText } from "@/components/shared/app-text";
import { AppAvatar } from "@/components/shared/app-avatar";
import { BackLink } from "@/components/shared/back-link";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { StarRating } from "@/components/shared/star-rating";
import { StatCard } from "@/components/shared/stat-card";
import { Pagination } from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { useReviews, useReviewSummary } from "./_hooks/use-reviews";
import type { ReviewAuthor } from "@/types/review";

// Clients are shown to drivers by first name and last initial, the way the
// design has them — the full name is not the driver's to keep.
const authorName = function (author: ReviewAuthor) {
  return (
    [author.first_name, author.last_name?.[0] && `${author.last_name[0]}.`]
      .filter(Boolean)
      .join(" ") || "A client"
  );
};

export default function ClientReviews() {
  const [page, setPage] = useState(1);

  const { summary, isFetching } = useReviewSummary();
  const {
    reviews,
    totalPages,
    isFetching: isFetchingReviews,
  } = useReviews({ page, limit: 10 });

  const average = summary?.average ?? 0;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <BackLink href="/driver/dashboard" />

      <div className="border-border border-b pb-5">
        <PageHeader
          title="Client reviews"
          subtitle="See what clients value about your service and where you can improve."
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-3">
        {isFetching && !summary ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-xl" />
          ))
        ) : (
          <>
            <StatCard
              label="Average rating"
              value={
                <span className="flex items-center gap-3">
                  {average.toFixed(1)}
                  <StarRating rating={average} />
                </span>
              }
              caption={`Based on ${summary?.total ?? 0} verified bookings`}
              captionTone="muted"
            />
            <StatCard
              label="Five-star reviews"
              value={summary?.five_star_count ?? 0}
              caption={`${summary?.five_star_percent ?? 0}% of all reviews`}
              captionTone="muted"
            />
            <StatCard
              label="Top strength"
              value={
                <span className="text-xl md:text-2xl">
                  {summary?.top_strength ?? "Not enough reviews"}
                </span>
              }
              caption={`${summary?.total ?? 0} verified reviews`}
              captionTone="muted"
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          limit={10}
          isLoading={isFetchingReviews}
          className="lg:col-span-2"
        >
          <div className="border-border overflow-hidden rounded-xl border bg-white">
            <div className="border-border flex items-start justify-between gap-3 border-b px-4 py-4 md:px-5">
              <div className="space-y-1">
                <AppText type="h4" className="text-base font-semibold">
                  Recent feedback
                </AppText>
                <AppText type="caption" className="text-muted-foreground block">
                  Only completed bookings can be reviewed.
                </AppText>
              </div>
            </div>

            {isFetchingReviews && !reviews.length ? (
              <div className="space-y-3 p-4">
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
              </div>
            ) : !reviews.length ? (
              <EmptyState
                illustration="/empty-reviews.svg"
                title="You have no reviews yet"
                description="Once clients you've worked with leave feedback, it'll show up here."
              />
            ) : (
              <div className="divide-border divide-y">
                {reviews.map((review) => (
                  <div key={review.id} className="space-y-3 p-4 md:p-5">
                    <div className="flex items-start gap-3">
                      <AppAvatar
                        src={review.author.profile_pic ?? undefined}
                        fallback={authorName(review.author)}
                        className="shrink-0"
                      />

                      <div className="min-w-0 flex-1">
                        <AppText type="label" className="block truncate">
                          {authorName(review.author)}
                        </AppText>
                        <AppText
                          type="caption"
                          className="text-muted-foreground block truncate"
                        >
                          {[review.booking?.title, formatDate(review.createdAt)]
                            .filter(Boolean)
                            .join(" · ")}
                        </AppText>
                      </div>

                      <StarRating rating={review.rating} className="shrink-0" />
                    </div>

                    {review.comment && (
                      <AppText
                        type="caption"
                        className="text-muted-foreground block"
                      >
                        &ldquo;{review.comment}&rdquo;
                      </AppText>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Pagination>

        {!!summary?.tags.length && (
          <div className="border-border space-y-4 rounded-xl border bg-white p-4 md:p-5">
            <AppText type="h4" className="text-base font-semibold">
              What clients mention
            </AppText>

            <div className="bg-brand-soft/40 flex flex-wrap gap-2 rounded-xl p-3">
              {summary.tags.map(({ tag, count }) => (
                <span
                  key={tag}
                  className="bg-brand-soft text-brand rounded-full px-3 py-1.5 text-xs font-semibold"
                >
                  {tag}
                  <span className="text-brand/60"> · {count}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
