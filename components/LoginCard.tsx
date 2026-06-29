import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginCard() {
    return (
        <Card className="mx-auto w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Enter your email and password to login.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-7">
                <div className="grid gap-4">
                    <div className="grid gap-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="m@example.com" className="rounded-sm" />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" className="rounded-sm" />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full rounded-sm">Login</Button>
            </CardFooter>
        </Card>
    );
}