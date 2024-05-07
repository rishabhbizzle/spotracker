
import React from 'react'
import Album from '@/components/charts/Album'
import Artist from '@/components/charts/Artist'
import Global from '@/components/charts/Global'
import Hot100 from '@/components/charts/Hot100'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Info } from 'lucide-react'
import Link from 'next/link'
import LastFmTopTracks from '@/components/charts/lastFmTopTracks'



const Chart = async ({ params, searchParams }) => {

  const chartArray = [
    {
      title: 'Billboard Hot 100',
      description: 'This chart is a property of Billboard. We do not own any of the data presented here. All rights to them',
      component: <Hot100 />,
      page: 'hot100'
    },
    {
      title: 'Billboard Album 200',
      description: 'This chart is a property of Billboard. We do not own any of the data presented here. All rights to them',
      component: <Album />,
      page: 'album200'
    },
    {
      title: 'Billboard Artist 100',
      description: 'This chart is a property of Billboard. We do not own any of the data presented here. All rights to them',
      component: <Artist />,
      page: 'artist100'
    },
    {
      title: 'Billboard Global 200',
      description: 'This chart is a property of Billboard. We do not own any of the data presented here. All rights to them',
      component: <Global />,
      page: 'global200'
    },
    {
      title: 'Last.fm Top Tracks',
      description: 'Chart displaying top tracks from Last.fm.',
      component: <LastFmTopTracks searchParams={searchParams} />,
      page: 'lastFmTopTracks'
    }
  ];


  const chartName = params.name
  const foundChartDetails = chartArray.find(chart => chart.page === chartName)
  if (!foundChartDetails) {
    return notFound()
  }

  return (
    <div className='md:p-10 min-h-screen'>
      <Card>
        <CardHeader>
          <CardTitle>{foundChartDetails?.title}</CardTitle>
          <CardDescription>{foundChartDetails?.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-3 md:p-6">
          {/* <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              This chart is a property of
              <Link href="https://www.billboard.com/" className='mx-1 font-semibold' target='_blank'>
                Billboard
              </Link>
              and are used for educational purposes only. We do not own any of the data presented here. All rights reserved to the respective owners.
            </AlertDescription>
          </Alert> */}
          <Card className="">
            {foundChartDetails.component}
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

export default Chart