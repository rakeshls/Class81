import firebase from 'firebase'
import React,{Component} from 'react'
import {View, Text, TextComponent, StyleSheet, TextInput} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Value } from 'react-native-reanimated'
import MyHeader from '../components/MyHeader'
import db from '../config'
export default class SettingScreen extends Component{
    constructor(){
        super()
        this.state={
            emailId:'',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            docId:''
        }
    }
    getUserDetails=()=>{
        var email=firebase.auth().currentUser.email
        alert(email)
        db.collection('Users').where('EmailId','==',email).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{ 
                var data=doc.data(
                    this.setState({
                        address:data.Address,
                        emailId:data.EmailId,
                        firstName:data.FirstName,
                        lastName:data.LastName,
                        contact:data.ContactNumber,
                        docId:doc.id
                    })
                )
            })
        })
    }
    componentDidMount(){
        this.getUserDetails()
    }
    UpdateUserDetails=()=>{
        db.collection('Users').doc(this.state.docId)
        .update({
            FirstName:this.state.firstName,
            LastName:this.state.lastName,
            Address:this.state.address,
            ContactNumber:this.state.contact
        })
        alert("Profile updated")
    }
    render(){
        return(
            <View style={styles.view}>
                <MyHeader title='Settings' navigation={this.props.navigation}/>
                <View>
                   <TextInput placeholder={'FirstName'} onChangeText={(text)=>{
                       this.setState({
                       firstName:text
                       })
                       Value=this.state.firstName
                   }}/>
                  <TextInput placeholder={'LastName'} onChangeText={(text)=>{
                       this.setState({
                       lastName:text
                       })
                       Value=this.state.lastName
                   }}/>
                 <TextInput placeholder={'Contact'} keyboardType={'numeric'} onChangeText={(text)=>{
                       this.setState({
                       contact:text
                       })
                       Value=this.state.contact
                    }} />
                      <TextInput placeholder={'Address'} onChangeText={(text)=>{
                       this.setState({
                       address:text
                       })
                       Value=this.state.address
                    }} />
                    <View>
                        <TouchableOpacity onPress={()=>{
                            this.UpdateUserDetails()
                        }}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    view:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})