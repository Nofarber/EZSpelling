import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import RubikRegular from '../font/Rubik-Regular.ttf';

Font.register({
  family: "RubikFamily",
  src: RubikRegular
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#58A3CE",
    flex: 1,  // Ensure the page covers everything
  },
  view: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Semi-transparent white background
    margin: 20, // Add margin for better visibility
    borderRadius: 10, // Optional: Add border radius for better aesthetics
    flex: 1, // Ensure the view covers the entire page
  },
  text: {
    color: "black",
    fontFamily: "RubikFamily",
    direction: "rtl" 
  }
});

const MyDocument = ({ formData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.view}>
        <Text style={styles.text}>שם: {formData.name}</Text>
        <Text style={styles.text}>מקום ההתנבות: {formData.place}</Text>
        <Text style={styles.text}>פרטים על ההתנדבות: {formData.details}</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
