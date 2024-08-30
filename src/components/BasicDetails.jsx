"use client";

import { Calendar, Info, Users, Sparkles } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import FavouriteButton from "./favourite";
import Link from "next/link";
import { toast } from "sonner";

import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toSentenceCase } from "@/lib/helperFunctions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useComparison } from "@/context/ComparisonProvider";

const populariyDetails = {
  album:
    "The popularity is calculated from the popularity of all the tracks in the album.",
  artist:
    "The popularity is calculated from the popularity of all their tracks.",
  track:
    "The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are. Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently.",
};

export default function BasicDetails({ details, type, spotifyId }) {
  const { isSignedIn: isAuthenticated, user, isLoaded } = useUser();
  const [isFavourite, setIsFavourite] = useState(false);
  const [reRender, setReRender] = useState(false);
  const { addToComparison, comparisonList } = useComparison();

  const fetchUserFavDetails = async () => {
    try {
      const userId = user?.id;
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/isFavourite`,
        {
          type,
          spotifyId,
          id: userId,
        }
      );
      if (res.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      setIsFavourite(res?.data?.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserFavDetails();
    }
  }, [isAuthenticated, user]);

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row py-5 gap-8">
        <div className="w-full md:w-[45%] flex justify-center">
          <img
            alt="cover"
            className="w-object-cover w-[250px] md:w-[300px] h-[250px] md:h-[300px]"
            src={
              type === "track"
                ? details?.album?.images[0]?.url
                : details?.images[0]?.url
            }
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <h1 className="text-4xl font-bold">{details?.name}</h1>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-2xl max-h-12 p-2 font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                  {details?.popularity}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 flex gap-2">
                <Info className="w-5 h-5" />
                <p className="w-60 break-words text-xs">
                  {populariyDetails[type]}
                </p>
              </PopoverContent>
            </Popover>
          </div>
          {type === "artist" ? (
            <div className="flex gap-5">
              <div>
                <Users className="inline-block mr-1" size={24} />
                <span className="text-sm">
                  {details?.followers?.total?.toLocaleString("en-US")} followers
                </span>
              </div>
              {details?.onTour === "1" && (
                <Badge variant="secondary">
                  <Sparkles className="w-4 h-4 mr-2" />
                  On Tour
                </Badge>
              )}
            </div>
          ) : (
            <div>
              <div>
                {details?.artists?.map((artist, i) => (
                  <Link
                    className="text-2xl font-bold hover:underline"
                    key={i}
                    href={`/artist/${artist.id}`}
                  >
                    {artist.name}
                    {i < details?.artists?.length - 1 ? ", " : ""}
                  </Link>
                ))}
              </div>
              {details?.release_date && (
                <div className="flex gap-1">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">{details?.release_date}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 mt-1 text-2xl font-bold items-center">
            {details?.genres?.map((genre, index) => {
              return <Badge key={index}>{toSentenceCase(genre)}</Badge>;
            })}
          </div>
          {details?.summary && (
            <div className="text-sm mt-3">{details?.summary}</div>
          )}

          <div className="mt-4 flex space-x-3 justify-center md:justify-normal">
            <FavouriteButton
              type={type}
              id={user?.id}
              spotifyId={details?.id}
              isFavourite={isFavourite}
              image={
                type === "track"
                  ? details?.album?.images[0]?.url
                  : details?.images[0]?.url
              }
              name={details?.name}
              setIsFavourite={setIsFavourite}
            />
            {/* <Button
              variant="outline"
              onClick={() => toast.info("Coming Soon !!!")}
            >
              Download PDF report
            </Button> */}
            {type === "artist" && (
            <Button
              variant="secondary"
              onClick={() => addToComparison(details)}
              disabled={
                comparisonList.some((a) => a.id === spotifyId)
              }
            >
              Add to Compare
            </Button>
          )}
          </div>
        </div>
      </div>
    </>
  );
}
