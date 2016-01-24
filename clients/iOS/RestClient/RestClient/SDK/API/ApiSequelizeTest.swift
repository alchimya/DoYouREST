//
//  ApiSequelizeTest.swift
//  RestClient
//
//  Created by Domenico Vacchiano on 21/01/16.
//  Copyright © 2016 Domenico Vacchiano. All rights reserved.
//

import Foundation

class ApiSequelizeTest: NSObject {

    static func perfomPostWithToken(token:String,andTableName table:String, andDelegate delegate:L3SDKJWARequestDelegate){
        L3SDKJWARequest.sendTo(
            url: "\(Server.sharedInstance.ressourcesEndpoint)/sequelize/query/customers",
            withMethod: L3SDKJWARequest.HTTPRequestMethod.POST,
            andParams:[
                "token":token
            ],
            andDelegate: delegate,
            andUserInfo:HTTPRequestTags.ApiBasictTest.rawValue)
    }
    
}
