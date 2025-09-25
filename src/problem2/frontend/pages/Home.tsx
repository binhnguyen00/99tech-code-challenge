import { DefaultLayout } from "@/components/DefaultLayout";
import { Button, Card, CardBody } from "@heroui/react";
import { TrendingUp, Zap, Shield, Globe, ArrowRight, BarChart3, Wallet, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 via-secondary-50/30 to-success-100/40 dark:from-primary-900/20 dark:via-secondary-900/10 dark:to-success-900/15"></div>

          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-gradient-to-r from-primary to-secondary p-3">
                  <Zap className="h-8 w-8 text-white" />
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-success bg-clip-text text-transparent">
                  Mock Exchange Crypto
                </span>
                <br />
                <span className="text-foreground">
                  Like Never Before
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-default-600 max-w-2xl mx-auto leading-relaxed">
                Experience lightning-fast cryptocurrency trading with real-time rates,
                advanced security, and zero hidden fees. Join thousands of traders worldwide.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  color="primary"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  onPress={() => navigate("/exchanges")}
                >
                  Exchange Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="bordered"
                  size="lg"
                  className="font-medium px-8 py-3 hover:bg-default-50 transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-default-50/50 dark:bg-default-900/10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary">$2.4B+</div>
                <div className="text-default-600 mt-1">Trading Volume</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-secondary">500K+</div>
                <div className="text-default-600 mt-1">Active Traders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-success">99.9%</div>
                <div className="text-default-600 mt-1">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-lg text-default-600 max-w-2xl mx-auto">
                Built for traders, by traders. Experience the future of cryptocurrency trading.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-primary-50/50 to-primary-100/30 dark:from-primary-900/10 dark:to-primary-800/5">
                <CardBody className="p-6">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Real-Time Trading</h3>
                  <p className="text-default-600">
                    Execute trades instantly with live market data and advanced charting tools.
                  </p>
                </CardBody>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-secondary-50/50 to-secondary-100/30 dark:from-secondary-900/10 dark:to-secondary-800/5">
                <CardBody className="p-6">
                  <div className="rounded-lg bg-secondary/10 p-3 w-fit mb-4">
                    <Shield className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Bank-Level Security</h3>
                  <p className="text-default-600">
                    Your funds are protected by military-grade encryption and cold storage.
                  </p>
                </CardBody>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-success-50/50 to-success-100/30 dark:from-success-900/10 dark:to-success-800/5">
                <CardBody className="p-6">
                  <div className="rounded-lg bg-success/10 p-3 w-fit mb-4">
                    <Globe className="h-6 w-6 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Global Access</h3>
                  <p className="text-default-600">
                    Trade 24/7 from anywhere in the world with our mobile-first platform.
                  </p>
                </CardBody>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-warning-50/50 to-warning-100/30 dark:from-warning-900/10 dark:to-warning-800/5">
                <CardBody className="p-6">
                  <div className="rounded-lg bg-warning/10 p-3 w-fit mb-4">
                    <BarChart3 className="h-6 w-6 text-warning" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
                  <p className="text-default-600">
                    Make informed decisions with comprehensive market analysis and insights.
                  </p>
                </CardBody>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-danger-50/50 to-danger-100/30 dark:from-danger-900/10 dark:to-danger-800/5">
                <CardBody className="p-6">
                  <div className="rounded-lg bg-danger/10 p-3 w-fit mb-4">
                    <Wallet className="h-6 w-6 text-danger" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Low Fees</h3>
                  <p className="text-default-600">
                    Keep more of your profits with our competitive trading fees and transparent pricing.
                  </p>
                </CardBody>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50/50 to-purple-100/30 dark:from-purple-900/10 dark:to-purple-800/5">
                <CardBody className="p-6">
                  <div className="rounded-lg bg-purple-500/10 p-3 w-fit mb-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
                  <p className="text-default-600">
                    Get help whenever you need it from our dedicated customer support team.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-r from-primary to-secondary">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join our community of successful traders and start your crypto journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                color="default"
                size="lg"
                className="bg-white text-primary font-semibold px-8 py-3 hover:bg-gray-50 transition-all duration-300"
              >
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="bordered"
                size="lg"
                className="border-white text-white font-medium px-8 py-3 hover:bg-white/10 transition-all duration-300"
              >
                View Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Recent Activity Preview */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Live Trading Activity
              </h2>
              <p className="text-default-600">
                See what's happening in the market right now
              </p>
            </div>

            <Card className="bg-default-50/50 dark:bg-default-900/20">
              <CardBody className="p-6">
                <div className="space-y-4">
                  {[
                    { pair: "BTC/USD", change: "+2.45%", price: "$67,234.56", color: "text-success" },
                    { pair: "ETH/USD", change: "-1.23%", price: "$3,456.78", color: "text-danger" },
                    { pair: "ADA/USD", change: "+0.78%", price: "$0.4523", color: "text-success" },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-divider last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                        <span className="font-medium">{item.pair}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{item.price}</div>
                        <div className={`text-sm ${item.color}`}>{item.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}