# k8s cluster
import {
  to = google_container_cluster.brewskie_cluster
  id = "projects/fiery-celerity-390306/locations/us-central1/clusters/brewskie-cluster"
}

resource "google_container_cluster" "brewskie_cluster" {
  name             = "brewskie-cluster"
  location         = var.region
  enable_autopilot = true
}

# dns zone for production
import {
  to = google_dns_managed_zone.production
  id = "projects/fiery-celerity-390306/managedZones/brewskie-prod"
}
resource "google_dns_managed_zone" "production" {
  name     = "brewskie-prod"
  dns_name = var.domain
}


import {
  to = google_compute_address.static_ip
  id = "projects/fiery-celerity-390306/regions/us-central1/addresses/static-ip"
}
resource "google_compute_address" "static_ip" {
  name   = "static-ip"
  region = var.region
}

# two records pointing getbrewskie.com and www.getbrewskie.com to whatever the endpoint of the cluster is
import {
  to = google_dns_record_set.getbrewskie
  id = "projects/fiery-celerity-390306/managedZones/brewskie-prod/rrsets/getbrewskie.com./A"
}
resource "google_dns_record_set" "getbrewskie" {
  name         = google_dns_managed_zone.production.dns_name
  type         = "A"
  ttl          = 300
  managed_zone = google_dns_managed_zone.production.name
  rrdatas      = [google_compute_address.static_ip.address]
}

import {
  to = google_dns_record_set.www_getbrewskie
  id = "projects/fiery-celerity-390306/managedZones/brewskie-prod/rrsets/www.getbrewskie.com./A"
}
resource "google_dns_record_set" "www_getbrewskie" {
  name         = "www.${google_dns_managed_zone.production.dns_name}"
  type         = "A"
  ttl          = 300
  managed_zone = google_dns_managed_zone.production.name
  rrdatas      = [google_compute_address.static_ip.address]
}

# this provisions a cluster
# and makes sure there's a dns A record that points www./getbrewskie.com 

output "static_ip" {
  value = google_compute_address.static_ip.address
}
