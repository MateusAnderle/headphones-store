import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Login } from '../screens/Login';
import { Cart } from '../screens/Cart';
import { UserAccount } from '../screens/UserAccount';
import { ProductDetail } from '../screens/ProductDetail';

const Stack = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="UserAccount" component={UserAccount} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}
