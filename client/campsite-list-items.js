import React from 'react'
import Service from './service.js'
import * as qs from 'qs'
import SiteInfo from './site-info.js'

export default function CampsitesList(props) {

  const activeSites = props.campsites.filter(site => {
    const facilityQuery = location.hash.replace(/^(.*?)\?/, '')
    return site.facilityNum === qs.parse(facilityQuery).facilityNum
  })

  return (
      <div className='container-fluid'>
        <div className='row'>
        { activeSites.map((site, index) =>
          <div key={index} className='col-xl-4 col-lg-6 mt-4'>
            <div className='card h-100 campsite-card shadow'>
              <div
                className='card-img-top campsite-list-image h-100'
                style={{backgroundImage:`url(${site.sitePhoto})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'}}>
                  <h5 className='card-title py-2 campsite-name text-light text-center'>{`Site #${site.siteNumber}`}</h5>
                </div>
              <div className='card-body py-2 pl-2 pr-2'>
                <div className='row'>
                  <SiteInfo content={`Price: $${props.campground.price}/night`} />
                  <SiteInfo content={`Max people: ${site.maxPeople}`} />
                  <SiteInfo content={`Max length: ${site.maxEqpLen}`} />
                  <SiteInfo content={`Max vehicles: ${site.maxVehicles}`} />
                  <SiteInfo content={`Site type: ${site.siteType}`} />
                  <SiteInfo
                    additionalElement={site.available
                      ? <i className='far fa-check-circle text-success' />
                      : <i className='far fa-times-circle text-danger' />}
                    content={`Available `} />
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
  )
}
