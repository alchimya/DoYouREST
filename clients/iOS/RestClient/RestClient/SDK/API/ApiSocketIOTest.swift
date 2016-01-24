//
//  ApiSocketIOTest.swift
//  RestClient
//
//  Created by Domenico Vacchiano on 21/01/16.
//  Copyright © 2016 Domenico Vacchiano. All rights reserved.
//

import Foundation
import CoreLocation

class ApiSocketIOTest: NSObject {

    
    static func perfomCheckInWithToken(token:String,andCoordinate coordinate:CLLocationCoordinate2D, andDelegate delegate:L3SDKJWARequestDelegate){
        L3SDKJWARequest.sendTo(
            url: "\(Server.sharedInstance.ressourcesEndpoint)/geolocation/checkin",
            withMethod: L3SDKJWARequest.HTTPRequestMethod.POST,
            andParams:[
                "token":token,
                "latitude":coordinate.latitude,
                "longitude":coordinate.longitude,
            ],
            andDelegate: delegate,
            andUserInfo:HTTPRequestTags.ApiBasictTest.rawValue)
    }
    
    static func perfomCheckOutWithToken(token:String,andDelegate delegate:L3SDKJWARequestDelegate){
        L3SDKJWARequest.sendTo(
            url: "\(Server.sharedInstance.ressourcesEndpoint)/geolocation/checkout",
            withMethod: L3SDKJWARequest.HTTPRequestMethod.POST,
            andParams:[
                "token":token
            ],
            andDelegate: delegate,
            andUserInfo:HTTPRequestTags.ApiBasictTest.rawValue)
    }
    
}
