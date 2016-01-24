//
//  JWT.swift
//  RestClient
//
//  Created by Domenico Vacchiano on 21/01/16.
//  Copyright © 2016 Domenico Vacchiano. All rights reserved.
//

import Foundation

class JWT: NSObject {
    static func authenticateUser(uid:String, withPassword pwd:String, andDelegate delegate:L3SDKJWARequestDelegate){

        L3SDKJWARequest.sendTo(
            url: Server.sharedInstance.authorizationEndpoint,
            withMethod: L3SDKJWARequest.HTTPRequestMethod.POST,
            andParams: [
                "uid":uid,"pwd":pwd
            ],
            andDelegate: delegate,
            andUserInfo:HTTPRequestTags.AuthToken.rawValue)
        
  
    }
}
