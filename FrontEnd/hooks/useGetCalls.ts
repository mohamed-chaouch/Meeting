"use client";

import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import useUserInfo from "./useUserInfo";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const streamClient = useStreamVideoClient();
  const { user, errorResponse, accessToken } = useUserInfo();

  useEffect(() => {

    const loadCalls = async () => {
      if (!streamClient || !user) return;

      setIsLoading(true);

      try {
        const { calls } = await streamClient.queryCalls({
          sort: [
            {
              field: "starts_at",
              direction: -1,
            },
          ],
          filter_conditions: {
            starts_at: {
              $exists: true,
            },
            $or: [
              {
                created_by_user_id: user._id,
              },
              {
                members: {
                  $in: [user._id],
                },
              },
            ],
          },
        });

        setCalls(calls);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [streamClient, user, user?._id]);

  const now = new Date();

  const endOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59
  );

  const previousCalls = calls.filter(
    ({ state: { startsAt, endedAt } }: Call) => {
      return (startsAt && new Date(startsAt) < now) || !!endedAt;
    }
  );

  const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  const upcomingCallsToday = calls.filter(({ state: { startsAt } }: Call) => {
    return (
      startsAt && new Date(startsAt) >= now && new Date(startsAt) <= endOfToday
    );
  });

  const soonestTime = upcomingCalls.reduce<Date | null>(
    (soonest, currentCall) => {
      const currentStart = currentCall.state.startsAt
        ? new Date(currentCall.state.startsAt)
        : null;
      if (!currentStart) return soonest;
      if (!soonest || currentStart < soonest) return currentStart;
      return soonest;
    },
    null
  );

  return {
    previousCalls,
    upcomingCalls,
    upcomingCallsToday,
    soonestTime,
    callRacordings: calls,
    isLoading,
  };
};
