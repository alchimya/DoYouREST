//
//  ApiBasicTest.swift
//  RestClient
//
//  Created by Domenico Vacchiano on 21/01/16.
//  Copyright © 2016 Domenico Vacchiano. All rights reserved.
//

import Foundation

class ApiBasicTest: NSObject {
    static func perfomPostWithToken(token:String, andDelegate delegate:L3SDKJWARequestDelegate){
        L3SDKJWARequest.sendTo(
            url: "\(Server.sharedInstance.ressourcesEndpoint)/test",
            withMethod: L3SDKJWARequest.HTTPRequestMethod.POST,
            andParams:["token":token],
            andDelegate: delegate,
            andUserInfo:HTTPRequestTags.ApiBasictTest.rawValue)
    }
}
