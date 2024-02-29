import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import RubikRegular from '../fonts/Rubik-Regular.ttf';
import { useEffect } from 'react';

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
  },
  image:{
    width:"90%",
    alignSelf:"center",
    marginTop:"30px"
  }
});

const MyDocument = ( {formData} ) => {
  const data = formData.imgURL


  return(
    <Document>
    <Page style={styles.page}>
      <View style={styles.view}>
        <Text style={styles.text}>{`שם פרטי: ${formData.firstname}`}</Text>
        <Text style={styles.text}>{`שם משפחה: ${formData.lastname}`}</Text>
        <Text style={styles.text}> {`מקום ההתנבות: ${formData.volenteeringPlace}`}</Text>
        <Text style={styles.text}>{formData.finalText}</Text>
        <Image style={styles.image} src={data} />
      </View>
    </Page>
  </Document>
    )
};

export default MyDocument;