//
//  L3SDKJWARequest.swift
//  Swift-JSON-API
//
//  Created by Domenico Vacchiano on 07/11/15.
//  Copyright © 2015 DomenicoVacchiano. All rights reserved.
//  https://github.com/alchimya/iOS-JSON-API

import UIKit

class  L3SDKJWARequest: NSObject {
    
    //enumeration to describe the http verbs
    enum HTTPRequestMethod:String{
        case GET = "GET"
        case POST = "POST"
    }
   
    //method used to send a request to the service
    static func sendTo (url url:String,withMethod httpMethod:HTTPRequestMethod,andParams params:Dictionary<String,AnyObject>?,andDelegate delegate:L3SDKJWARequestDelegate){
        sendTo(url: url, withMethod: httpMethod, andParams: params, andDelegate: delegate, andUserInfo: nil)
    }
    static func sendTo (url url:String,withMethod httpMethod:HTTPRequestMethod,andParams params:Dictionary<String,AnyObject>?,andDelegate delegate:L3SDKJWARequestDelegate, andUserInfo:AnyObject?){

        //creates and setup a request
        let request = NSMutableURLRequest(URL: NSURL(string: url)!)
        
        let session = NSURLSession.sharedSession()
        request.HTTPMethod = httpMethod.rawValue
        if (params != nil){
            request.HTTPBody = try! NSJSONSerialization.dataWithJSONObject(params!, options: [])
        }
        
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        
        //sends a request to consume a service
        let task = session.dataTaskWithRequest(request, completionHandler: {data, response, taskError -> Void in
            
            if (taskError != nil) {
                delegate.L3SDKJWARequestDelegate_Error!(taskError!)
                return
            }
            
            do {
                let json = try NSJSONSerialization.JSONObjectWithData(data!, options: .MutableLeaves )
                delegate.L3SDKJWARequestDelegate_Response(json, userInfo: andUserInfo)
                
            } catch  let error as NSError  {
               //print(error.localizedDescription)
                delegate.L3SDKJWARequestDelegate_Error!(error)
            }
        
        })
    
        task.resume()
        
    }

}
