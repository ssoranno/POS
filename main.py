# First Kivy App Demo
# Shows Front End Functionality

import kivy
#kivy.require('1.9.0')
import requests
import json

from kivy.app import App
#from kivy.uix.floatlayout import FloatLayout
from kivy.core.window import Window
from kivy.uix.button import Button
from kivy.lang import Builder
from kivy.factory import Factory
from kivy.uix.screenmanager import ScreenManager, Screen

Builder.load_string("""
<B@Button>:
    font_size: 32
    color: 1, 1, 1, 1
    size: 150, 50
    size_hint: .7, .15
    background_color: 0.88, 0.88, 0.88, 1
<B2@Button>:
    font_size: 32
    color: 1, 1, 1, 1
    size: 25, 25
    size_hint: .15, .15
    background_color: 0.88, 0.88, 0.88, 1
<Welcome>:
    FloatLayout:
        B:
            text: "Login"
            pos_hint: {"center_x": 0.5, "center_y":0.75}
            on_press: 
                root.manager.current = "login"
                root.manager.transition.direction = 'left'
        B:
            text: "Register New Account"
            pos_hint: {"center_x": 0.5, "center_y":0.55}
            on_press: 
                root.manager.current = "register"
                root.manager.transition.direction = 'left'
        B:
            text: "Call Manager"
            pos_hint: {"center_x": 0.5, "center_y":0.35}
            on_press: 
                root.manager.current = "call"
                root.manager.transition.direction = 'left'
        Label:
            text: "Open Source POS"
            font_size: 25
            pos_hint: {"center_x": 0.5, "center_y":0.9}
            id: L

<Login>:
    FloatLayout:
        Label:
            text: "Username:"
            font_size: 25
            pos_hint: {"center_x": 0.5, "center_y":0.8}
        TextInput:
            font_size: 32
            size_hint: .5, .1
            pos_hint: {"center_x": 0.5, "center_y":0.65}
            id: login
        Label:
            text: "Password:"
            font_size: 25
            pos_hint: {"center_x": 0.5, "center_y":0.55}
        TextInput:
            password: True
            font_size: 32
            size_hint: .5, .1
            pos_hint: {"center_x": 0.5, "center_y":0.45}
            id: passw
        Label:
            text: ""
            font_size: 14
            pos_hint: {"center_x": 0.5, "center_y":0.37}
            id: LoggedIn
        B:
            text: "Back"
            pos_hint: {"center_x": 0.5, "center_y":0.1}
            on_press: 
                root.manager.current = "welcome"
                root.ids["LoggedIn"].text = ""
                root.ids["login"].text = ""
                root.ids["passw"].text = ""
                root.manager.transition.direction = 'right'
        B:
            text: "Submit"
            pos_hint: {"center_x": 0.5, "center_y":0.25}
            on_press: root.manager.current = "mainmenu"
<MainMenu>:
    FloatLayout:
        B:
            text: "Take Order"
            pos_hint: {"center_x": 0.5, "center_y":0.7}
            on_press: 
                root.manager.current = "tableview"
                root.manager.transition.direction = 'left'
        B:
            text: "Process Transaction"
            pos_hint: {"center_x": 0.5, "center_y":0.5}
        B:
            text: "Logout"
            pos_hint: {"center_x": 0.5, "center_y":0.3}
            on_press: root.manager.current = "welcome"

<OrderScreen>:
    on_pre_enter: root.getFood()
    FloatLayout:

        B:
            text: "Back"
            pos_hint: {"center_x": 0.5, "center_y":0.2}
            on_press: 
                root.manager.current = "mainmenu"
                root.manager.transition.direction = 'right' 

<TableView>:
    FloatLayout:
        B2:
            text: "Table 1"
            pos_hint: {"center_x": 0.2, "center_y":0.8}
            on_press: root.manager.current = "oscreen"
        B2:
            text: "Table 2"
            pos_hint: {"center_x": 0.4, "center_y":0.8}
        B2:
            text: "Table 3"
            pos_hint: {"center_x": 0.6, "center_y":0.8}
        B2:
            text: "Table 4"
            pos_hint: {"center_x": 0.8, "center_y":0.8}
        B2:
            text: "Table 5"
            pos_hint: {"center_x": 0.2, "center_y":0.6}
        B2:
            text: "Table 6"
            pos_hint: {"center_x": 0.4, "center_y":0.6}
        B:
            text: "Back"
            pos_hint: {"center_x": 0.5, "center_y":0.2}
            on_press: 
                root.manager.current = "mainmenu"
                root.manager.transition.direction = 'right' 

<Register>:
    FloatLayout:
        Label:
            text: "Username:"
            font_size: 25
            pos_hint: {"center_x": 0.5, "center_y":0.8}
        TextInput:
            font_size: 32
            size_hint: .5, .1
            pos_hint: {"center_x": 0.5, "center_y":0.65}
            id: login
        Label:
            text: "Password:"
            font_size: 25
            pos_hint: {"center_x": 0.5, "center_y":0.55}
        TextInput:
            password: True
            font_size: 32
            size_hint: .5, .1
            pos_hint: {"center_x": 0.5, "center_y":0.45}
            id: passw
        B:
            text: "Create Account"
            pos_hint: {"center_x": 0.5, "center_y":0.3}
            on_press: root.create_new_account()
        B:
            text: "Back"
            pos_hint: {"center_x": 0.5, "center_y":0.1}
            on_press: 
                root.manager.current = "welcome"
                root.manager.transition.direction = 'right'

<Call>:
    B:
        text: "Ping Manager's Phone"
        pos_hint: {"center_x": 0.5, "center_y":0.65}
    B:
        text: "Back"
        pos_hint: {"center_x": 0.5, "center_y":0.45}
        on_press: 
            root.manager.current = "welcome"
            root.manager.transition.direction = 'right'
""")


class Welcome(Screen):
    pass
class Login(Screen):
    def verify_credentials(self):
        url = "https://posdemo-68bbd.firebaseio.com/username/"+self.ids["login"].text+".json"
        source = requests.get(url)
        print(source.text)
        if(source.text == "null"):
            print("error incorrect username")
            self.ids["LoggedIn"].text = "Incorrect Username"
        else:
            password = source.text.replace("\"", "")
            if password == self.ids["passw"].text:
                #self.ids["LoggedIn"].text = "Logged In"
                self.ids["login"].text = ""
                self.ids["passw"].text = ""
                self.manager.current = "mainmenu"
            else:
                self.ids["LoggedIn"].text = "Incorrect Password"

class Register(Screen):
    def create_new_account(self):
        username = str(self.ids["login"].text)
        password = str(self.ids["passw"].text)
        payload = {username:password}
        print(json.dumps(payload))
        r = requests.patch("https://posdemo-68bbd.firebaseio.com/username.json", data=json.dumps(payload))
        print(r.content)
        self.ids["login"].text = ""
        self.ids["passw"].text = ""
        


class Call(Screen):
    pass

class MainMenu(Screen):
    pass
class TableView(Screen):
    pass
class OrderScreen(Screen):
    def getFood(self):
        print("got Food")
        url = "https://posdemo-68bbd.firebaseio.com/Food.json"
        source = requests.get(url)
        jsonObj = source.json()
        for item in jsonObj:
            print(jsonObj[item]["Name"])
            btn1 = Button(text=jsonObj[item]["Name"])
            self.add_widget(btn1)
        #print(jsonObj["Name"])


screen_manager = ScreenManager()

screen_manager.add_widget(Welcome(name='welcome'))
screen_manager.add_widget(Login(name='login'))
screen_manager.add_widget(Register(name='register'))
screen_manager.add_widget(Call(name='call'))
screen_manager.add_widget(MainMenu(name='mainmenu'))
screen_manager.add_widget(TableView(name='tableview'))
screen_manager.add_widget(OrderScreen(name='oscreen'))

class HelloKivy(App):
    def build(self):
        Window.clearcolor = (0,0,.5,1)
        return screen_manager
        #return Label()
        #return Button(text="press me")
hk = HelloKivy()
hk.run()