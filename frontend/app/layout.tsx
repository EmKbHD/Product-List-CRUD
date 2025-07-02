import { Provider } from "@/components/ui/provider";
import { ApolloProviderWrapper } from "./libs/ApolloProviderWrapper";
import { Toaster } from "@/components/ui/toaster";
export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <ApolloProviderWrapper>
            <Toaster />
            {children}
          </ApolloProviderWrapper>
        </Provider>
      </body>
    </html>
  );
}
