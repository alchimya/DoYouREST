//
//  Server.swift
//  RestClient
//
//  Created by Domenico Vacchiano on 21/01/16.
//  Copyright © 2016 Domenico Vacchiano. All rights reserved.
//

import UIKit

class Server: NSObject {
    
    static let sharedInstance=Server()
    private let host="http://localhost";
    private let port=8080;
    
    var authorizationEndpoint:String{
        get{
            return "\(self.host):\(self.port)/token";
        }
    }
    var ressourcesEndpoint:String{
        return "\(self.host):\(self.port)/api";
    }
    
    override init() {}
    
}



