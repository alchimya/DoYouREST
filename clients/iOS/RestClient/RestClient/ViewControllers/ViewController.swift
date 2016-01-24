//
//  ViewController.swift
//  RestClient
//
//  Created by Domenico Vacchiano on 21/01/16.
//  Copyright © 2016 Domenico Vacchiano. All rights reserved.
//

import UIKit
import CoreLocation
class ViewController: UIViewController,L3SDKJWARequestDelegate {

    private let kSegueIdMapView="SEGUE_ID_MAPVIEW";
    
    enum RequestType:Int32{
        case Token=1
        case ApiTestBasic=2
        case ApiTestSocketIOCheckIn=3
        case ApiTestSocketIOCheckOut=4
        case ApiTestSequelize=5
    }
    @IBOutlet weak var txtUID: UITextField!
    @IBOutlet weak var txtPWD: UITextField!
    @IBOutlet weak var txtResponse: UITextView!
    
    
    var token:String="";
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func sendRequest(sender: UIButton) {
        
        switch (Int32(sender.tag)){
        case RequestType.Token.rawValue:
            JWT.authenticateUser(self.txtUID.text!, withPassword: self.txtPWD.text!,andDelegate: self);
            break;
        case RequestType.ApiTestBasic.rawValue:
            ApiBasicTest.perfomPostWithToken(token, andDelegate: self)
            break;
        case RequestType.ApiTestSequelize.rawValue:
            ApiSequelizeTest.perfomPostWithToken(token, andTableName: "album", andDelegate: self);
            break;
        /*
        //see MapViewController
        case RequestType.ApiTestSocketIOCheckIn.rawValue:
            ApiSocketIOTest.perfomCheckInWithToken(token,
                andCoordinate: CLLocationCoordinate2D.init(latitude: 52.052438, longitude: 1.157567),
                andDelegate: self);
            break;
        case RequestType.ApiTestSocketIOCheckOut.rawValue:
            ApiSocketIOTest.perfomCheckOutWithToken(token, andDelegate: self);
            break;
        */
        default:
            break;
        }
        
    }
    
    //MARK JWA callbacks
    func  L3SDKJWARequestDelegate_Response (response:AnyObject?,userInfo:AnyObject?){
        
   
        if (response != nil){
            let dict=responseToDictionary(response);
            
            switch (userInfo as!String){
            case HTTPRequestTags.AuthToken.rawValue:
                if let _token=dict?.valueForKey("token"){
                    self.token=_token as! String;
                }
                break;
            default:
                print("no value");
            }
            
            
            dispatch_async(dispatch_get_main_queue(), {
                self.txtResponse.text="\(response)";
            })
        }
        

    }
    
    func L3SDKJWARequestDelegate_Error(error:NSError){
        print(error);
    }

    private func responseToDictionary(response:AnyObject!)->NSDictionary?{
        
        //web data response presentation
        if let dict = response as? NSDictionary {
            return dict;
        }
        else if let jsonArray = response as? NSArray {
            //do something with your json array
            let dict:NSMutableDictionary=NSMutableDictionary();
            var index=0;
            for itemArray in jsonArray {
                dict.setValue(itemArray, forKey: "\(index)");
                index++;
            }
            return dict;
        }

        return nil;
        
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        
        if segue.identifier==kSegueIdMapView{
            let vc:MapViewController=segue.destinationViewController as!MapViewController;
            vc.token=self.token;
        }
        
    }
    
}

