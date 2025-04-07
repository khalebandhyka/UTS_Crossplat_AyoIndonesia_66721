import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

// Types
interface Venue {
  id: string
  name: string
  location: string
  image: string
  rating: number
  price: string
  distance: string
  isNew?: boolean
}

// Update the component definition to include navigation prop
const VenueBookingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All")

  // Mock data for new venues
  const newVenues: Venue[] = [
    {
      id: "1",
      name: "Grand Sports Arena",
      location: "Downtown",
      image: "https://placeholder.svg?height=200&width=300",
      rating: 4.8,
      price: "$25/hr",
      distance: "2.5 km",
      isNew: true,
    },
    {
      id: "2",
      name: "City Football Field",
      location: "Westside",
      image: "https://placeholder.svg?height=200&width=300",
      rating: 4.6,
      price: "$20/hr",
      distance: "3.2 km",
      isNew: true,
    },
    {
      id: "3",
      name: "Tennis Club Pro",
      location: "Eastside",
      image: "https://placeholder.svg?height=200&width=300",
      rating: 4.9,
      price: "$30/hr",
      distance: "1.8 km",
      isNew: true,
    },
    {
      id: "4",
      name: "Olympic Swimming Center",
      location: "North District",
      image: "https://placeholder.svg?height=200&width=300",
      rating: 4.7,
      price: "$22/hr",
      distance: "4.1 km",
      isNew: true,
    },
  ]

  // Mock data for venue options
  const venueOptions: Venue[] = [
    {
      id: "5",
      name: "Basketball Court",
      location: "Central Park",
      image: "https://placeholder.svg?height=150&width=150",
      rating: 4.5,
      price: "$18/hr",
      distance: "1.2 km",
    },
    {
      id: "6",
      name: "Soccer Field",
      location: "Sports Complex",
      image: "https://placeholder.svg?height=150&width=150",
      rating: 4.3,
      price: "$22/hr",
      distance: "2.7 km",
    },
    {
      id: "7",
      name: "Badminton Hall",
      location: "Recreation Center",
      image: "https://placeholder.svg?height=150&width=150",
      rating: 4.4,
      price: "$15/hr",
      distance: "3.5 km",
    },
    {
      id: "8",
      name: "Volleyball Court",
      location: "Beach Club",
      image: "https://placeholder.svg?height=150&width=150",
      rating: 4.6,
      price: "$20/hr",
      distance: "5.0 km",
    },
    {
      id: "9",
      name: "Golf Course",
      location: "Greenfield",
      image: "https://placeholder.svg?height=150&width=150",
      rating: 4.8,
      price: "$40/hr",
      distance: "7.2 km",
    },
    {
      id: "10",
      name: "Cricket Ground",
      location: "Sports Village",
      image: "https://placeholder.svg?height=150&width=150",
      rating: 4.2,
      price: "$25/hr",
      distance: "4.3 km",
    },
  ]

  // Categories for filter
  const categories = ["All", "Football", "Basketball", "Tennis", "Swimming", "Volleyball"]

  // Render new venue item
  const renderNewVenueItem = ({ item }: { item: Venue }) => (
    <TouchableOpacity
      style={styles.newVenueCard}
      onPress={() => navigation.navigate("VenueDetailScreen", { venueId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.newVenueImage} />
      <View style={styles.newVenueOverlay}>
        <View style={styles.newVenueInfo}>
          <Text style={styles.newVenueName}>{item.name}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color="#fff" />
            <Text style={styles.newVenueLocation}>{item.location}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.newVenueRating}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  // Render venue option item
  const renderVenueOptionItem = ({ item }: { item: Venue }) => (
    <TouchableOpacity
      style={styles.venueOptionCard}
      onPress={() => navigation.navigate("VenueDetailScreen", { venueId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.venueOptionImage} />
      <View style={styles.venueOptionInfo}>
        <Text style={styles.venueOptionName}>{item.name}</Text>
        <View style={styles.venueOptionDetails}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.venueOptionLocation}>{item.location}</Text>
          </View>
          <View style={styles.distanceContainer}>
            <Ionicons name="navigate-outline" size={14} color="#666" />
            <Text style={styles.venueOptionDistance}>{item.distance}</Text>
          </View>
        </View>
        <View style={styles.venueOptionFooter}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.venueOptionRating}>{item.rating}</Text>
          </View>
          <Text style={styles.venueOptionPrice}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Find Venues</Text>
          <Text style={styles.headerSubtitle}>Book your favorite sport venue</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#999" />
        <Text style={styles.searchText}>Search venues...</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* New Venues Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>New Sport Venues on Ayo</Text>
          <FlatList
            data={newVenues}
            renderItem={renderNewVenueItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.newVenuesContainer}
          />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, activeCategory === category && styles.activeCategoryButton]}
              onPress={() => setActiveCategory(category)}
            >
              <Text style={[styles.categoryText, activeCategory === category && styles.activeCategoryText]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Venue Options Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Venue Options</Text>
          <View style={styles.venueOptionsContainer}>
            {venueOptions.map((venue) => (
              <View key={venue.id} style={styles.venueOptionWrapper}>
                {renderVenueOptionItem({ item: venue })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchText: {
    marginLeft: 8,
    color: "#999",
    fontSize: 16,
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  newVenuesContainer: {
    paddingRight: 16,
  },
  newVenueCard: {
    width: 280,
    height: 180,
    borderRadius: 16,
    marginRight: 16,
    overflow: "hidden",
  },
  newVenueImage: {
    width: "100%",
    height: "100%",
  },
  newVenueOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 16,
  },
  newVenueInfo: {
    justifyContent: "flex-end",
  },
  newVenueName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  newVenueLocation: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  newVenueRating: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 4,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  activeCategoryButton: {
    backgroundColor: "#9B0000",
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
  },
  activeCategoryText: {
    color: "#fff",
    fontWeight: "600",
  },
  venueOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  venueOptionWrapper: {
    width: "100%",
    marginBottom: 16,
  },
  venueOptionCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  venueOptionImage: {
    width: 100,
    height: 100,
  },
  venueOptionInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  venueOptionName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  venueOptionDetails: {
    marginBottom: 4,
  },
  venueOptionLocation: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  venueOptionDistance: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  venueOptionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  venueOptionRating: {
    fontSize: 14,
    color: "#333",
    marginLeft: 4,
  },
  venueOptionPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
  backButton: {
    padding: 8,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
})

export default VenueBookingScreen

