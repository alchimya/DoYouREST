//
//  MapViewController.swift
//  RestClient
//
//  Created by Domenico Vacchiano on 21/01/16.
//  Copyright © 2016 Domenico Vacchiano. All rights reserved.
//

import UIKit
import MapKit

class MapViewController: UIViewController,MKMapViewDelegate,L3SDKJWARequestDelegate {
    private var locationManager:CLLocationManager=CLLocationManager();
    private var checkInOutButton:UIBarButtonItem?;
    private var isCheckIn:Bool=false;
    var token:String?="";
    
    @IBOutlet weak var mapView: MKMapView!
    override func viewDidLoad() {
        super.viewDidLoad()
        locationManager = CLLocationManager()
        locationManager.requestWhenInUseAuthorization()
        
        self.mapView.delegate=self;
        self.mapView.showsUserLocation=true;
        

        self.checkInOutButton = UIBarButtonItem(title: "Check-In", style: UIBarButtonItemStyle.Plain, target: self, action: "checkInOut")
        
        self.navigationItem.rightBarButtonItem = checkInOutButton
  
    }
    func checkInOut(){
    
        if !self.isCheckIn{
            ApiSocketIOTest.perfomCheckInWithToken(self.token!,
                andCoordinate: CLLocationCoordinate2D.init(latitude: self.mapView.userLocation.coordinate.latitude, longitude: self.mapView.userLocation.coordinate.longitude),
                andDelegate: self);
            self.isCheckIn=true;
            self.checkInOutButton?.title="Check-Out";
        }else{
            ApiSocketIOTest.perfomCheckOutWithToken(self.token!, andDelegate: self);
            self.isCheckIn=false;
            self.checkInOutButton?.title="Check-In";
        }
        

    
    }
    
    //MARK JWA callbacks
    func  L3SDKJWARequestDelegate_Response (response:AnyObject?,userInfo:AnyObject?){
        print(response);
    }
    
    func L3SDKJWARequestDelegate_Error(error:NSError){
        print(error);
    }
    
    
    func mapView(mapView: MKMapView,
        viewForAnnotation annotation: MKAnnotation) -> MKAnnotationView? {
            centerMapOnUserLocation()
            return nil;
    }
    let regionRadius: CLLocationDistance = 500
    func centerMapOnUserLocation() {
        let coordinateRegion = MKCoordinateRegionMakeWithDistance(self.mapView.userLocation.coordinate,
            regionRadius, 0)
        self.mapView.setRegion(coordinateRegion, animated: true)
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
