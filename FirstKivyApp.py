import kivy
kivy.require('1.9.0')

from kivy.app import App
#from kivy.uix.floatlayout import FloatLayout
from kivy.core.window import Window
from kivy.lang import Builder
from kivy.uix.screenmanager import ScreenManager, Screen

Builder.load_string("""
<B@Button>:
    font_size: 32
    color: 0, 0, 0, 1
    size: 150, 50
    size_hint: .7, .15
    background_color: .88, .88, .88, 1
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
        B:
            text: "Submit"
            pos_hint: {"center_x": 0.5, "center_y":0.25}
            on_press: root.verify_credentials()

<Register>:
    B:
        text: "Back"
        pos_hint: {"center_x": 0.5, "center_y":0.5}
        on_press: root.manager.current = "welcome"

<Call>:
    B:
        text: "Ping Manager's Phone"
        pos_hint: {"center_x": 0.5, "center_y":0.65}
    B:
        text: "Back"
        pos_hint: {"center_x": 0.5, "center_y":0.45}
        on_press: root.manager.current = "welcome"

""")


class Welcome(Screen):
    pass
class Login(Screen):
    def verify_credentials(self):
        if self.ids["login"].text == "username" and self.ids["passw"].text == "password":
            self.ids["LoggedIn"].text = "Logged In"

class Register(Screen):
    pass

class Call(Screen):
    pass

screen_manager = ScreenManager()

screen_manager.add_widget(Welcome(name='welcome'))
screen_manager.add_widget(Login(name='login'))
screen_manager.add_widget(Register(name='register'))
screen_manager.add_widget(Call(name='call'))

class HelloKivy(App):
    def build(self):
        Window.clearcolor = (0,0,1,1)
        return screen_manager
        #return Label()
        #return Button(text="press me")
hk = HelloKivy()
hk.run()