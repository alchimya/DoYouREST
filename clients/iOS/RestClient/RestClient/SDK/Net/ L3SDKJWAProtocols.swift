//
//  L3SDKJWAProtocols.swift
//  Swift-JSON-API
//
//  Created by Domenico Vacchiano on 07/11/15.
//  Copyright © 2015 DomenicoVacchiano. All rights reserved.
//  https://github.com/alchimya/iOS-JSON-API

import Foundation

//protocol to describe the response events
@objc
protocol L3SDKJWARequestDelegate{
    //raised when a response will be sent from the service
    func  L3SDKJWARequestDelegate_Response (response:AnyObject?,userInfo:AnyObject?)
    //raised if occur an error
    optional func  L3SDKJWARequestDelegate_Error(error:NSError)
}