import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {LaptopsList} from "./screens/LaptopsList"
import {LaptopsForm} from "./screens/LaptopsForm"


export default function App() {

  const StackLaptops = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StackLaptops.Navigator>
        <StackLaptops.Screen name='LaptopsList'
          component={LaptopsList}
        />
        <StackLaptops.Screen name='LaptopsForm'
          component={LaptopsForm}
        />
      </StackLaptops.Navigator>
    </NavigationContainer>
  );
}

